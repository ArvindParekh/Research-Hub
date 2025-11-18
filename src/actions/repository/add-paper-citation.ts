"use server";
import {
   addPaperCitationSchema,
   AddPaperCitationSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PaperCitation } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function addPaperCitation(
   payload: AddPaperCitationSchema
): Promise<ActionResponse<{ citation: PaperCitation }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = addPaperCitationSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { fromPaperId, toPaperId, toPublicationId } = validatedPayload.data;

   try {
      // check if user is an author of fromPaper
      const fromPaper = await prisma.repositoryPaper.findUnique({
         where: { id: fromPaperId },
         include: { authors: true },
      });

      if (!fromPaper) {
         return {
            success: false,
            message: "Paper not found",
            data: null,
         };
      }

      const isAuthor = fromPaper.authors.some(
         (author) => author.userId === stackUser.id
      );

      if (!isAuthor) {
         return {
            success: false,
            message: "Only authors can add citations",
            data: null,
         };
      }

      const citation = await prisma.paperCitation.create({
         data: {
            fromPaperId,
            ...(toPaperId && { toPaperId }),
            ...(toPublicationId && { toPublicationId }),
         },
      });

      // update citation count on target repository paper
      if (toPaperId) {
         await prisma.repositoryPaper.update({
            where: { id: toPaperId },
            data: { citations: { increment: 1 } },
         });
      }

      return {
         success: true,
         message: "Citation added successfully",
         data: { citation },
      };
   } catch (error) {
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2002"
      ) {
         return {
            success: false,
            message: "Citation already exists",
            data: null,
         };
      }
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2025"
      ) {
         return {
            success: false,
            message: "Target paper or publication not found",
            data: null,
         };
      }
      console.error("Error adding citation", error);
      throw new Error("Database error");
   }
}
