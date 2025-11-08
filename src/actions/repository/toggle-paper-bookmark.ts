"use server";
import {
   togglePaperBookmarkSchema,
   TogglePaperBookmarkSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function togglePaperBookmark(
   payload: TogglePaperBookmarkSchema
): Promise<ActionResponse<{ bookmarked: boolean }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = togglePaperBookmarkSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { paperId } = validatedPayload.data;

   try {
      const existingBookmark = await prisma.paperBookmark.findUnique({
         where: {
            paperId_userId: { paperId, userId: stackUser.id },
         },
      });

      if (existingBookmark) {
         await prisma.paperBookmark.delete({
            where: { id: existingBookmark.id },
         });

         return {
            success: true,
            message: "Bookmark removed",
            data: { bookmarked: false },
         };
      }

      await prisma.paperBookmark.create({
         data: {
            paperId,
            userId: stackUser.id,
         },
      });

      return {
         success: true,
         message: "Paper bookmarked",
         data: { bookmarked: true },
      };
   } catch (error) {
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2025"
      ) {
         return {
            success: false,
            message: "Paper not found",
            data: null,
         };
      }
      console.error("Error toggling bookmark", error);
      throw new Error("Database error");
   }
}
