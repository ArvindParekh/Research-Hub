"use server";
import {
   addChannelMemberSchema,
   AddChannelMemberSchema,
} from "@/lib/types/request-validation/messages";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { ChannelMember } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function addChannelMember(
   payload: AddChannelMemberSchema
): Promise<ActionResponse<{ member: ChannelMember }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = addChannelMemberSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { channelId, userId } = validatedPayload.data;

   try {
      // make sure requester is admin/moderator/leader
      const requesterMembership = await prisma.channelMember.findUnique({
         where: { channelId_userId: { channelId, userId: stackUser.id } },
         select: {
            role: true,
            channel: {
               select: {
                  groupId: true,
                  group: { select: { leaderId: true } },
               },
            },
         },
      });

      if (!requesterMembership) {
         return {
            success: false,
            message: "Not a member of this channel",
            data: null,
         };
      }

      const isLeader =
         requesterMembership.channel.group.leaderId === stackUser.id;
      const canAdd =
         isLeader ||
         requesterMembership.role === "Admin" ||
         requesterMembership.role === "Moderator";

      if (!canAdd) {
         return {
            success: false,
            message: "Only admins/moderators can add members",
            data: null,
         };
      }

      // make sure target user is in the group
      const groupMember = await prisma.groupMember.findUnique({
         where: {
            groupId_userId: {
               groupId: requesterMembership.channel.groupId,
               userId,
            },
            status: "Active",
         },
      });

      if (!groupMember) {
         return {
            success: false,
            message: "User is not an active group member",
            data: null,
         };
      }

      const member = await prisma.channelMember.create({
         data: { channelId, userId },
      });

      return {
         success: true,
         message: "Member added successfully",
         data: { member },
      };
   } catch (error) {
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2002"
      ) {
         return {
            success: false,
            message: "User already in channel",
            data: null,
         };
      }
      console.error("Error adding channel member", error);
      throw new Error("Database error");
   }
}
