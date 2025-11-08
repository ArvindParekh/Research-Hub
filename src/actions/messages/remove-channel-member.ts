"use server";
import {
   removeChannelMemberSchema,
   RemoveChannelMemberSchema,
} from "@/lib/types/request-validation/messages";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";

export async function removeChannelMember(
   payload: RemoveChannelMemberSchema
): Promise<ActionResponse<{ isRemoved: boolean }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = removeChannelMemberSchema.safeParse(payload);
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
      // make sure requester has permission
      const requesterMembership = await prisma.channelMember.findUnique({
         where: { channelId_userId: { channelId, userId: stackUser.id } },
         select: {
            role: true,
            channel: { select: { group: { select: { leaderId: true } } } },
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
      const isSelf = userId === stackUser.id;
      const canRemove =
         isLeader ||
         requesterMembership.role === "Admin" ||
         requesterMembership.role === "Moderator" ||
         isSelf;

      if (!canRemove) {
         return {
            success: false,
            message: "Insufficient permissions",
            data: null,
         };
      }

      const deleted = await prisma.channelMember.deleteMany({
         where: { channelId, userId },
      });

      if (deleted.count === 0) {
         return { success: false, message: "Member not found", data: null };
      }

      return {
         success: true,
         message: "Member removed successfully",
         data: { isRemoved: true },
      };
   } catch (error) {
      console.error("Error removing channel member", error);
      throw new Error("Database error");
   }
}
