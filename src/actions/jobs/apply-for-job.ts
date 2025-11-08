"use server";
import {
   applyForJobSchema,
   ApplyForJobSchema,
} from "@/lib/types/request-validation/jobs";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { JobApplication } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function applyForJob(
   payload: ApplyForJobSchema
): Promise<ActionResponse<{ application: JobApplication }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = applyForJobSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const {
      jobId,
      coverLetter,
      resumeUrl,
      additionalDocuments,
      contactEmail,
      contactPhone,
      availableFrom,
      notes,
   } = validatedPayload.data;

   try {
      const application = await prisma.jobApplication.create({
         data: {
            jobId,
            userId: stackUser.id,
            coverLetter,
            resumeUrl,
            additionalDocuments,
            contactEmail,
            contactPhone,
            ...(availableFrom && { availableFrom: new Date(availableFrom) }),
            notes,
         },
      });

      return {
         success: true,
         message: "Application submitted successfully",
         data: { application },
      };
   } catch (error) {
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2002"
      ) {
         return {
            success: false,
            message: "You have already applied for this job",
            data: null,
         };
      }
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2003"
      ) {
         return { success: false, message: "Job not found", data: null };
      }
      console.error("Error applying for job", error);
      throw new Error("Database error");
   }
}
