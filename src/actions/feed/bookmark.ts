"use server";

import { stackServerApp } from "@/stack/server";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import {
   togglePostBookmarkSchema,
   type TogglePostBookmarkSchema,
} from "@/lib/types/request-validation/feed";
import { Prisma } from "@/generated/prisma/client";

export async function togglePostBookmark(
   payload: TogglePostBookmarkSchema
): Promise<ActionResponse<{ isBookmarked: boolean }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return {
         success: false,
         message: "Unauthorized",
         data: null,
      };
   }

   const validatedPayload = togglePostBookmarkSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { postId } = validatedPayload.data;

   try {
      const deleted = await prisma.postBookmark.deleteMany({
         where: { postId, userId: stackUser.id },
      });

      if (deleted.count === 0) {
         await prisma.postBookmark.create({
            data: { postId, userId: stackUser.id },
         });
         return {
            success: true,
            data: { isBookmarked: true },
            message: "Post bookmark added successfully",
         };
      }

      return {
         success: true,
         data: { isBookmarked: false },
         message: "Post bookmark removed successfully",
      };
   } catch (error) {
      if (
         error instanceof Prisma.PrismaClientKnownRequestError &&
         error.code === "P2003"
      ) {
         return {
            success: false,
            message: "Post not found",
            data: null,
         };
      }
      console.error("Error in togglePostBookmark", error);
      throw new Error("Database error");
   }
}
