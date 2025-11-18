"use server";
import {
   getRepositoryPaperSchema,
   GetRepositoryPaperSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { RepositoryPaper } from "@prisma/client";

type PaperWithDetails = RepositoryPaper & {
   authors: Array<{
      id: string;
      userId: string;
      order: number;
      affiliation: string | null;
      user: {
         id: string;
         firstName: string | null;
         lastName: string | null;
         institution: string | null;
         title: string | null;
      };
   }>;
   category: { id: string; name: string; slug: string | null } | null;
   keywords: Array<{ id: string; keyword: string }>;
   versions: Array<{
      id: string;
      version: string;
      changelog: string | null;
      fileUrl: string | null;
      createdAt: Date;
   }>;
   publication: { id: string; title: string; doi: string | null } | null;
   bookmarks: Array<{ userId: string }>;
   _count: {
      reviews: number;
      bookmarks: number;
      citationsReceived: number;
   };
};

export async function getRepositoryPaper(
   payload: GetRepositoryPaperSchema
): Promise<
   ActionResponse<{
      paper: Omit<PaperWithDetails, "bookmarks">;
      isBookmarked: boolean;
      isAuthor: boolean;
   }>
> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = getRepositoryPaperSchema.safeParse(payload);
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
      const paper = await prisma.repositoryPaper.findUnique({
         where: { id: paperId },
         include: {
            authors: {
               include: {
                  user: {
                     select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        institution: true,
                        title: true,
                     },
                  },
               },
               orderBy: { order: "asc" },
            },
            category: true,
            keywords: true,
            versions: {
               orderBy: { createdAt: "desc" },
               take: 5,
            },
            publication: {
               select: {
                  id: true,
                  title: true,
                  doi: true,
               },
            },
            bookmarks: {
               where: { userId: stackUser.id },
               select: { userId: true },
            },
            _count: {
               select: {
                  reviews: true,
                  bookmarks: true,
                  citationsReceived: true,
               },
            },
         },
      });

      if (!paper) {
         return {
            success: false,
            message: "Paper not found",
            data: null,
         };
      }

      // increment view count async (fire and forget)
      prisma.repositoryPaper
         .update({
            where: { id: paperId },
            data: { views: { increment: 1 } },
         })
         .catch((error) => console.error("Error incrementing views", error));

      const isBookmarked = paper.bookmarks.length > 0;
      const isAuthor = paper.authors.some(
         (author) => author.userId === stackUser.id
      );

      const { bookmarks, ...paperData } = paper;

      return {
         success: true,
         message: "Paper fetched successfully",
         data: { paper: paperData, isBookmarked, isAuthor },
      };
   } catch (error) {
      console.error("Error fetching paper", error);
      throw new Error("Database error");
   }
}
