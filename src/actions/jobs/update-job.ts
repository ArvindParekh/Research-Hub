"use server";
import {
   updateJobSchema,
   UpdateJobSchema,
} from "@/lib/types/request-validation/jobs";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Job } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function updateJob(
   payload: UpdateJobSchema
): Promise<ActionResponse<{ job: Job }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = updateJobSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { jobId, ...updateData } = validatedPayload.data;

   const processedData = {
      ...updateData,
      ...(updateData.applicationDeadline && {
         applicationDeadline: new Date(updateData.applicationDeadline),
      }),
      ...(updateData.startDate && {
         startDate: new Date(updateData.startDate),
      }),
   };

   try {
      // only poster can update
      const updatedJob = await prisma.job.update({
         where: {
            id: jobId,
            posterId: stackUser.id,
         },
         data: processedData,
      });

      return {
         success: true,
         message: "Job updated successfully",
         data: { job: updatedJob },
      };
   } catch (error) {
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2025"
      ) {
         return {
            success: false,
            message: "Job not found or you are not the poster",
            data: null,
         };
      }
      console.error("Error updating job", error);
      throw new Error("Database error");
   }
}
