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
   hIndex: number;
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
         paperCitationsReceived: number;
      };
   }[];
   advisees: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      designation: string | null;
      institution: string | null;
      role: string | null;
   }[];
   posts: {
      id: string;
      content: string | null;
      createdAt: Date;
      _count: {
         reactions: number;
         comments: number;
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
                  posts: true,
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
                        paperCitationsReceived: true,
                     },
                  },
               },
               orderBy: {
                  publicationDate: "desc",
               },
               take: 10,
            },
            ledGroups: {
               select: {
                  members: {
                     where: {
                        status: "Active",
                     },
                     select: {
                        role: true,
                        user: {
                           select: {
                              id: true,
                              firstName: true,
                              lastName: true,
                              designation: true,
                              institution: true,
                           },
                        },
                     },
                  },
               },
            },
            posts: {
               where: {
                  deletedAt: null,
               },
               select: {
                  id: true,
                  content: true,
                  createdAt: true,
                  _count: {
                     select: {
                        reactions: true,
                        comments: true,
                     },
                  },
               },
               orderBy: {
                  createdAt: "desc",
               },
               take: 5,
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

      const publicationsForHIndex = await prisma.publication.findMany({
         where: { authors: { some: { id: userId } } },
         select: {
            _count: {
               select: {
                  citations_received: true,
                  paperCitationsReceived: true,
               },
            },
         },
      });

      const citationCounts = publicationsForHIndex
         .map(
            (p) => p._count.citations_received + p._count.paperCitationsReceived
         )
         .sort((a, b) => b - a);

      let hIndex = 0;
      for (let i = 0; i < citationCounts.length; i++) {
         if (citationCounts[i] >= i + 1) {
            hIndex = i + 1;
         } else {
            break;
         }
      }

      const advisees = user.ledGroups.flatMap((group) =>
         group.members.map((member) => ({
            ...member.user,
            role: member.role,
         }))
      );

      const userProfile: UserProfile = {
         ...user,
         hIndex,
         advisees,
      };

      return {
         success: true,
         message: "User profile fetched successfully",
         data: userProfile,
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
