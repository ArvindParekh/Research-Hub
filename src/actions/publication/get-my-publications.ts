"use server";
import {
   getMyPublicationsSchema,
   GetMyPublicationsSchema,
} from "@/lib/types/request-validation/publications";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Publication } from "@prisma/client";

export async function getMyPublications(
   payload: GetMyPublicationsSchema
): Promise<
   ActionResponse<{
      items: (Publication & {
         authors: {
            id: string;
            firstName: string | null;
            lastName: string | null;
         }[];
         _count: { citations_received: number };
      })[];
      nextCursor: string | undefined;
   }>
> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = getMyPublicationsSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { cursor, limit } = validatedPayload.data;

   try {
      const publications = await prisma.publication.findMany({
         where: {
            authors: {
               some: { id: stackUser.id },
            },
         },
         include: {
            authors: { select: { id: true, firstName: true, lastName: true } },
            _count: { select: { citations_received: true } },
         },
         orderBy: { publicationDate: "desc" },
         take: limit + 1,
         ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      });

      const hasMore = publications.length > limit;
      const items = hasMore ? publications.slice(0, -1) : publications;
      const nextCursor = hasMore ? items[items.length - 1].id : undefined;

      return {
         success: true,
         message: "Publications fetched successfully",
         data: { items, nextCursor },
      };
   } catch (error) {
      console.error("Error getting my publications", error);
      throw new Error("Database error");
   }
}
