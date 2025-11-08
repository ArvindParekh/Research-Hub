"use server";

import {
   unfollowUserSchema,
   UnfollowUserSchema,
} from "@/lib/types/request-validation/connection";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";

export async function unfollowUser(
   payload: UnfollowUserSchema
): Promise<ActionResponse<{ isUnfollowed: boolean }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return {
         success: false,
         message: "Unauthorized",
         data: null,
      };
   }

   const validatedPayload = unfollowUserSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { targetUserId } = validatedPayload.data;

   try {
      const deleted = await prisma.connection.deleteMany({
         where: { followerId: stackUser.id, followingId: targetUserId },
      });

      if (deleted.count === 0) {
         return {
            success: false,
            message: "Not following this user or already unfollowed",
            data: null,
         };
      }

      return {
         success: true,
         message: "User unfollowed successfully",
         data: { isUnfollowed: true },
      };
   } catch (error) {
      console.error("Error unfollowing user", error);
      throw new Error("Database error");
   }
}
