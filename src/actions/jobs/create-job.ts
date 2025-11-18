"use server";
import {
  createJobSchema,
  CreateJobSchema,
} from "@/lib/types/request-validation/jobs";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Job } from "@/generated/prisma/client";

export async function createJob(
  payload: CreateJobSchema,
): Promise<ActionResponse<{ job: Job }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = createJobSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { applicationDeadline, startDate, salaryMin, salaryMax, ...restData } =
    validatedPayload.data;

  try {
    const newJob = await prisma.job.create({
      data: {
        ...restData,
        posterId: stackUser.id, // logged in user posts the job
        ...(applicationDeadline && {
          applicationDeadline: new Date(applicationDeadline),
        }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(salaryMin && { salaryMin }),
        ...(salaryMax && { salaryMax }),
      },
    });

    return {
      success: true,
      message: "Job created successfully",
      data: { job: newJob },
    };
  } catch (error) {
    console.error("Error creating job", error);
    throw new Error("Database error");
  }
}
