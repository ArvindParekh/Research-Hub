"use server";
import {
   withdrawJobApplicationSchema,
   WithdrawJobApplicationSchema,
} from "@/lib/types/request-validation/jobs";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";

export async function withdrawJobApplication(
   payload: WithdrawJobApplicationSchema
): Promise<ActionResponse<{ isWithdrawn: boolean }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = withdrawJobApplicationSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { jobId } = validatedPayload.data;

   try {
      const deleted = await prisma.jobApplication.deleteMany({
         where: {
            jobId,
            userId: stackUser.id,
         },
      });

      if (deleted.count === 0) {
         return {
            success: false,
            message: "Application not found",
            data: null,
         };
      }

      return {
         success: true,
         message: "Application withdrawn successfully",
         data: { isWithdrawn: true },
      };
   } catch (error) {
      console.error("Error withdrawing application", error);
      throw new Error("Database error");
   }
}
