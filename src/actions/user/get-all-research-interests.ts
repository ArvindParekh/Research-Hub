"use server";

import { prisma } from "@/lib/prisma";
import { ActionResponse } from "@/lib/types/action-response";

export interface ResearchInterestOption {
   id: string;
   interest: string;
   userCount: number;
}

export async function getAllResearchInterests(): Promise<
   ActionResponse<{ interests: ResearchInterestOption[] }>
> {
   try {
      const interests = await prisma.researchInterest.findMany({
         select: {
            id: true,
            interest: true,
            _count: {
               select: {
                  users: true,
               },
            },
         },
         orderBy: [
            {
               users: {
                  _count: "desc",
               },
            },
            {
               interest: "asc",
            },
         ],
         take: 100, // limit to top 100 most popular interests
      });

      return {
         success: true,
         message: "Research interests fetched successfully",
         data: {
            interests: interests.map((interest) => ({
               id: interest.id,
               interest: interest.interest,
               userCount: interest._count.users,
            })),
         },
      };
   } catch (error) {
      console.error("Error fetching research interests:", error);
      throw new Error("Database error");
   }
}
