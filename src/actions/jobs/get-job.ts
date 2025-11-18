"use server";
import {
  getJobSchema,
  GetJobSchema,
} from "@/lib/types/request-validation/jobs";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Job } from "@/generated/prisma/client";

export async function getJob(payload: GetJobSchema): Promise<
  ActionResponse<{
    job: Job & {
      poster: {
        id: string;
        firstName: string | null;
        lastName: string | null;
      } | null;
      _count: { applications: number };
    };
  }>
> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = getJobSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { jobId } = validatedPayload.data;

  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        poster: { select: { id: true, firstName: true, lastName: true } },
        _count: { select: { applications: true } },
      },
    });

    if (!job) {
      return { success: false, message: "Job not found", data: null };
    }

    return {
      success: true,
      message: "Job fetched successfully",
      data: { job },
    };
  } catch (error) {
    console.error("Error getting job", error);
    throw new Error("Database error");
  }
}
