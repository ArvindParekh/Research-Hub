"use server";
import {
   updateApplicationStatusSchema,
   UpdateApplicationStatusSchema,
} from "@/lib/types/request-validation/jobs";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { JobApplication } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function updateApplicationStatus(
   payload: UpdateApplicationStatusSchema
): Promise<ActionResponse<{ application: JobApplication }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = updateApplicationStatusSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { applicationId, status, employerNotes } = validatedPayload.data;

   try {
      // only job poster can update application status
      const application = await prisma.jobApplication.findUnique({
         where: { id: applicationId },
         select: { job: { select: { posterId: true } } },
      });

      if (!application || application.job.posterId !== stackUser.id) {
         return {
            success: false,
            message: "Only job poster can update application status",
            data: null,
         };
      }

      const updatedApplication = await prisma.jobApplication.update({
         where: { id: applicationId },
         data: {
            status,
            ...(employerNotes !== undefined && { employerNotes }),
            reviewedAt: new Date(),
            ...(status !== "Submitted" && { respondedAt: new Date() }),
         },
      });

      return {
         success: true,
         message: "Application status updated successfully",
         data: { application: updatedApplication },
      };
   } catch (error) {
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2025"
      ) {
         return {
            success: false,
            message: "Application not found",
            data: null,
         };
      }
      console.error("Error updating application status", error);
      throw new Error("Database error");
   }
}
