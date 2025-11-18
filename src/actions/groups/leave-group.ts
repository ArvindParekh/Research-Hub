"use server";

import {
   leaveGroupSchema,
   LeaveGroupSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { GroupMember } from "@prisma/client";

export async function leaveGroup(
   payload: LeaveGroupSchema
): Promise<ActionResponse<{ isLeft: boolean }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return {
         success: false,
         message: "Unauthorized",
         data: null,
      };
   }

   const validatedPayload = leaveGroupSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }
   const { groupId } = validatedPayload.data;

   try {
      const group = await prisma.group.findUnique({
         where: { id: groupId },
         select: { leaderId: true },
      });

      if (group?.leaderId === stackUser.id) {
         return {
            success: false,
            message: "Leaders must transfer ownership before leaving",
            data: null,
         };
      }

      const deleted = await prisma.groupMember.deleteMany({
         where: { groupId, userId: stackUser.id },
      });

      if (deleted.count === 0) {
         return {
            success: false,
            message: "Not a member of this group",
            data: null,
         };
      }

      return {
         success: true,
         message: "Left group successfully",
         data: { isLeft: deleted.count > 0 },
      };
   } catch (error) {
      console.error("Error leaving group", error);
      throw new Error("Database error");
   }
}
