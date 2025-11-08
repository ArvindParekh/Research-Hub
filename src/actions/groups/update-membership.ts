"use server";

import {
   updateGroupMembershipSchema,
   UpdateGroupMembershipSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { GroupMember } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function updateGroupMembership(
   payload: UpdateGroupMembershipSchema
): Promise<ActionResponse<{ membership: GroupMember }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = updateGroupMembershipSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { groupId, userId, role, isAdmin } = validatedPayload.data;

   try {
      // make sure if requester has permission to update membership
      const requesterMembership = await prisma.groupMember.findUnique({
         where: { groupId_userId: { groupId, userId: stackUser.id } },
         select: { isAdmin: true, group: { select: { leaderId: true } } },
      });

      const isLeader = requesterMembership?.group.leaderId === stackUser.id;

      if (!requesterMembership || (!requesterMembership.isAdmin && !isLeader)) {
         return {
            success: false,
            message: "Only admins or leader can update memberships",
            data: null,
         };
      }

      // leader can't remove thier own admin status
      if (userId === stackUser.id && isLeader && isAdmin === false) {
         return {
            success: false,
            message: "Leader cannot remove their own admin status",
            data: null,
         };
      }

      const updatedMembership = await prisma.groupMember.update({
         where: { groupId_userId: { groupId, userId } },
         data: {
            ...(role !== undefined && { role }),
            ...(isAdmin !== undefined && { isAdmin }),
         },
      });

      return {
         success: true,
         message: "Membership updated successfully",
         data: { membership: updatedMembership },
      };
   } catch (error) {
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2025"
      ) {
         return { success: false, message: "Member not found", data: null };
      }
      console.error("Error updating membership", error);
      throw new Error("Database error");
   }
}
