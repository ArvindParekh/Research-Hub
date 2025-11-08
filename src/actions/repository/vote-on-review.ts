"use server";
import {
   voteOnReviewSchema,
   VoteOnReviewSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function voteOnReview(
   payload: VoteOnReviewSchema
): Promise<ActionResponse<{ voted: boolean; isHelpful?: boolean }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = voteOnReviewSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { reviewId, isHelpful } = validatedPayload.data;

   try {
      const existingVote = await prisma.reviewHelpfulVote.findUnique({
         where: {
            reviewId_userId: { reviewId, userId: stackUser.id },
         },
      });

      if (existingVote) {
         if (existingVote.isHelpful === isHelpful) {
            // remove vote
            await prisma.reviewHelpfulVote.delete({
               where: { id: existingVote.id },
            });

            // update review counts
            await prisma.paperReview.update({
               where: { id: reviewId },
               data: {
                  [isHelpful ? "helpfulCount" : "notHelpfulCount"]: {
                     decrement: 1,
                  },
               },
            });

            return {
               success: true,
               message: "Vote removed",
               data: { voted: false },
            };
         } else {
            // change vote
            await prisma.reviewHelpfulVote.update({
               where: { id: existingVote.id },
               data: { isHelpful },
            });

            // update review counts
            await prisma.paperReview.update({
               where: { id: reviewId },
               data: {
                  helpfulCount: { [isHelpful ? "increment" : "decrement"]: 1 },
                  notHelpfulCount: {
                     [isHelpful ? "decrement" : "increment"]: 1,
                  },
               },
            });

            return {
               success: true,
               message: "Vote updated",
               data: { voted: true, isHelpful },
            };
         }
      }

      // non-existing vote, so create a new one
      await prisma.reviewHelpfulVote.create({
         data: {
            reviewId,
            userId: stackUser.id,
            isHelpful,
         },
      });

      // update review counts
      await prisma.paperReview.update({
         where: { id: reviewId },
         data: {
            [isHelpful ? "helpfulCount" : "notHelpfulCount"]: { increment: 1 },
         },
      });

      return {
         success: true,
         message: "Vote recorded",
         data: { voted: true, isHelpful },
      };
   } catch (error) {
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2025"
      ) {
         return {
            success: false,
            message: "Review not found",
            data: null,
         };
      }
      console.error("Error voting on review", error);
      throw new Error("Database error");
   }
}
