"use server";
import {
   addResearchInterestSchema,
   AddResearchInterestSchema,
} from "@/lib/types/request-validation/user-profile";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { ResearchInterest } from "@/generated/prisma/client";

export async function addResearchInterest(
   payload: AddResearchInterestSchema
): Promise<ActionResponse<{ interest: ResearchInterest }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = addResearchInterestSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { interest } = validatedPayload.data;

   try {
      // check if user already has this interest
      const existingConnection = await prisma.researchInterest.findFirst({
         where: {
            interest: { equals: interest, mode: "insensitive" },
            users: { some: { id: stackUser.id } },
         },
      });

      if (existingConnection) {
         return {
            success: false,
            message: "Interest already added",
            data: null,
         };
      }

      const researchInterest = await prisma.researchInterest.upsert({
         where: { interest },
         update: {
            users: { connect: { id: stackUser.id } },
         },
         create: {
            interest,
            users: { connect: { id: stackUser.id } },
         },
      });

      return {
         success: true,
         message: "Research interest added successfully",
         data: { interest: researchInterest },
      };
   } catch (error) {
      console.error("Error adding research interest", error);
      throw new Error("Database error");
   }
}
