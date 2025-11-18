"use server";

import { stackServerApp } from "@/stack/server";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import {
   deletePostSchema,
   type DeletePostSchema,
} from "@/lib/types/request-validation/feed";
import { Prisma } from "@prisma/client";

export async function deletePost(
   payload: DeletePostSchema
): Promise<ActionResponse<{ isDeleted: boolean }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return {
         success: false,
         message: "Unauthorized",
         data: null,
      };
   }

   const validatedPayload = deletePostSchema.safeParse(payload);
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
      await prisma.post.delete({
         where: { id: postId, authorId: stackUser.id },
      });

      return {
         success: true,
         message: "Post deleted successfully",
         data: { isDeleted: true },
      };
   } catch (error) {
      if (
         error instanceof Prisma.PrismaClientKnownRequestError &&
         error.code === "P2025"
      ) {
         return {
            success: false,
            message: "Post not found or Unauthorized",
            data: null,
         };
      }
      console.error("Error in deletePost", error);
      throw new Error("Database error");
   }
}
