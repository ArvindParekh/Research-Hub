"use server";
import {
   addPaperReviewSchema,
   AddPaperReviewSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PaperReview } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function addPaperReview(
   payload: AddPaperReviewSchema
): Promise<ActionResponse<{ review: PaperReview }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = addPaperReviewSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { paperId, rating, summary, content, isAnonymous, reviewType } =
      validatedPayload.data;

   try {
      // check if user already reviewed
      const existingReview = await prisma.paperReview.findFirst({
         where: {
            paperId,
            userId: stackUser.id,
         },
      });

      if (existingReview) {
         return {
            success: false,
            message: "You have already reviewed this paper",
            data: null,
         };
      }

      // if not, create new review
      const review = await prisma.paperReview.create({
         data: {
            paperId,
            userId: isAnonymous ? null : stackUser.id,
            reviewerName: isAnonymous ? "Anonymous" : null,
            isAnonymous,
            rating,
            summary,
            content,
            reviewType,
         },
      });

      // update paper's review count and average rating
      const reviews = await prisma.paperReview.findMany({
         where: { paperId },
         select: { rating: true },
      });

      const averageRating =
         reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

      await prisma.repositoryPaper.update({
         where: { id: paperId },
         data: {
            reviewCount: reviews.length,
            averageRating,
         },
      });

      return {
         success: true,
         message: "Review submitted successfully",
         data: { review },
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
      console.error("Error adding review", error);
      throw new Error("Database error");
   }
}
