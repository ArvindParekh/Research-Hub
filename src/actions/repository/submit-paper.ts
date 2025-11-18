"use server";
import {
   submitRepositoryPaperSchema,
   SubmitRepositoryPaperSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { RepositoryPaper } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function submitRepositoryPaper(
   payload: SubmitRepositoryPaperSchema
): Promise<ActionResponse<{ paper: RepositoryPaper }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = submitRepositoryPaperSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { title, abstract, categoryId, pdfUrl, keywords, authorIds } =
      validatedPayload.data;

   try {
      // ?: before that, do we want to check if the current user is one of the authors?
      const paper = await prisma.repositoryPaper.create({
         data: {
            title,
            abstract,
            categoryId: categoryId || null,
            currentVersion: "v1",
            currentPdfUrl: pdfUrl,
            status: "Draft",
            authors: {
               create: authorIds.map((userId, index) => ({
                  userId,
                  order: index,
               })),
            },
            versions: {
               create: {
                  version: "v1",
                  fileUrl: pdfUrl,
               },
            },
            ...(keywords && {
               keywords: {
                  connectOrCreate: keywords.map((keyword) => ({
                     where: { keyword },
                     create: { keyword },
                  })),
               },
            }),
         },
      });

      return {
         success: true,
         message: "Paper submitted successfully",
         data: { paper },
      };
   } catch (error) {
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2025"
      ) {
         return {
            success: false,
            message: "One or more authors not found",
            data: null,
         };
      }
      console.error("Error submitting paper", error);
      throw new Error("Database error");
   }
}
