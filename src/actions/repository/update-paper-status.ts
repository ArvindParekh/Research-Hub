"use server";
import {
   updatePaperStatusSchema,
   UpdatePaperStatusSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PaperStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function updatePaperStatus(
   payload: UpdatePaperStatusSchema
): Promise<ActionResponse<{ status: PaperStatus }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = updatePaperStatusSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { paperId, status } = validatedPayload.data;

   try {
      const existingPaper = await prisma.repositoryPaper.findUnique({
         where: { id: paperId },
         include: { authors: true },
      });

      if (!existingPaper) {
         return {
            success: false,
            message: "Paper not found",
            data: null,
         };
      }

      const isAuthor = existingPaper.authors.some(
         (author) => author.userId === stackUser.id
      );

      if (!isAuthor) {
         return {
            success: false,
            message: "Only authors can update paper status",
            data: null,
         };
      }

      // validate status transitions - mini state machine :)
      const validTransitions: Record<PaperStatus, PaperStatus[]> = {
         Draft: ["UnderReview"],
         UnderReview: ["Published", "Draft"],
         Published: [],
         Withdrawn: [],
      };

      if (!validTransitions[existingPaper.status].includes(status)) {
         return {
            success: false,
            message: `Cannot transition from ${existingPaper.status} to ${status}`,
            data: null,
         };
      }

      await prisma.repositoryPaper.update({
         where: { id: paperId },
         data: {
            status,
            ...(status === "UnderReview" &&
               !existingPaper.submittedAt && { submittedAt: new Date() }),
         },
      });

      return {
         success: true,
         message: "Paper status updated successfully",
         data: { status },
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
      console.error("Error updating paper status", error);
      throw new Error("Database error");
   }
}
