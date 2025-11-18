"use server";
import {
   getPublicationSchema,
   GetPublicationSchema,
} from "@/lib/types/request-validation/publications";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Publication } from "@prisma/client";

export async function getPublication(payload: GetPublicationSchema): Promise<
   ActionResponse<{
      publication: Publication & {
         authors: {
            id: string;
            firstName: string | null;
            lastName: string | null;
         }[];
         _count: { citations_received: number; citations_made: number };
      };
   }>
> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = getPublicationSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { publicationId } = validatedPayload.data;

   try {
      const publication = await prisma.publication.findUnique({
         where: { id: publicationId },
         include: {
            authors: { select: { id: true, firstName: true, lastName: true } },
            _count: {
               select: { citations_received: true, citations_made: true },
            },
         },
      });

      if (!publication) {
         return {
            success: false,
            message: "Publication not found",
            data: null,
         };
      }

      return {
         success: true,
         message: "Publication fetched successfully",
         data: { publication },
      };
   } catch (error) {
      console.error("Error getting publication", error);
      throw new Error("Database error");
   }
}
