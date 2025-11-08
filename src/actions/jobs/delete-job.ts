"use server";
import {
   deleteJobSchema,
   DeleteJobSchema,
} from "@/lib/types/request-validation/jobs";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function deleteJob(
   payload: DeleteJobSchema
): Promise<ActionResponse<{ isDeleted: boolean }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = deleteJobSchema.safeParse(payload);
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
      // as always, only poster can delete
      await prisma.job.delete({
         where: {
            id: jobId,
            posterId: stackUser.id,
         },
      });

      return {
         success: true,
         message: "Job deleted successfully",
         data: { isDeleted: true },
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
      console.error("Error deleting job", error);
      throw new Error("Database error");
   }
}
