import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import {
   togglePostReactionSchema,
   type TogglePostReactionSchema,
} from "@/lib/types/request-validation/feed";
import { stackServerApp } from "@/stack/server";

export async function togglePostReaction(
   payload: TogglePostReactionSchema
): Promise<ActionResponse<{ isReacted: boolean }>> {
   const userId = await stackServerApp.getUser();
   if (!userId) {
      return {
         success: false,
         message: "Unauthorized",
         data: null,
      };
   }

   const validatedPayload = togglePostReactionSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { postId, reactionType } = validatedPayload.data;

   try {
      const existing = await prisma.postReaction.findUnique({
         where: {
            postId_userId: {
               postId,
               userId: userId.id,
            },
         },
      });

      if (existing) {
         if (existing.type === reactionType) {
            await prisma.postReaction.delete({
               where: {
                  id: existing.id,
               },
            });
            return {
               success: true,
               data: { isReacted: false },
               message: "Post reaction toggled successfully",
            };
         } else {
            await prisma.postReaction.update({
               where: {
                  id: existing.id,
               },
               data: {
                  type: reactionType,
               },
            });
            return {
               success: true,
               data: { isReacted: true },
               message: "Post reaction toggled successfully",
            };
         }
      }

      await prisma.postReaction.create({
         data: {
            postId,
            userId: userId.id,
            type: reactionType,
         },
      });
      return {
         success: true,
         data: { isReacted: true },
         message: "Post reaction toggled successfully",
      };
   } catch (error) {
      console.log("Error in togglePostReaction", error);
      throw new Error("Database error");
   }
}
