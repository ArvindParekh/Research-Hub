"use server";

import { prisma } from "@/lib/prisma";
import { ActionResponse } from "@/lib/types/action-response";

export interface UserProfile {
   id: string;
   firstName: string | null;
   lastName: string | null;
   designation: string | null;
   institution: string | null;
   title: string | null;
   location: string | null;
   website: string | null;
   bio: string | null;
   createdAt: Date;
   _count: {
      followers: number;
      following: number;
      publications: number;
      posts: number;
      repositoryPapers: number;
   };
   researchInterests: {
      id: string;
      interest: string;
   }[];
   publications: {
      id: string;
      title: string;
      journal: string | null;
      publicationDate: Date | null;
      doi: string | null;
      abstract: string | null;
      _count: {
         citations_received: number;
      };
   }[];
}

export async function getUserProfile(
   userId: string
): Promise<ActionResponse<UserProfile>> {
   try {
      const user = await prisma.user.findUnique({
         where: { id: userId },
         select: {
            id: true,
            firstName: true,
            lastName: true,
            designation: true,
            institution: true,
            title: true,
            location: true,
            website: true,
            bio: true,
            createdAt: true,
            _count: {
               select: {
                  followers: {
                     where: { status: "Accepted" },
                  },
                  following: {
                     where: { status: "Accepted" },
                  },
                  publications: true,
                  posts: {
                     where: { deletedAt: null },
                  },
                  repositoryPapers: true,
               },
            },
            researchInterests: {
               select: {
                  id: true,
                  interest: true,
               },
               take: 10,
            },
            publications: {
               select: {
                  id: true,
                  title: true,
                  journal: true,
                  publicationDate: true,
                  doi: true,
                  abstract: true,
                  _count: {
                     select: {
                        citations_received: true,
                     },
                  },
               },
               orderBy: {
                  publicationDate: "desc",
               },
               take: 10,
            },
         },
      });

      if (!user) {
         return {
            success: false,
            message: "User not found",
            data: null,
         };
      }

      return {
         success: true,
         message: "User profile fetched successfully",
         data: user as UserProfile,
      };
   } catch (error) {
      console.error("Error fetching user profile:", error);
      return {
         success: false,
         message: "Failed to fetch user profile",
         data: null,
      };
   }
}
