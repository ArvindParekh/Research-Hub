"use server";
import {
  getMyJobsSchema,
  GetMyJobsSchema,
} from "@/lib/types/request-validation/jobs";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Job } from "@/generated/prisma/client";

export async function getMyJobs(payload: GetMyJobsSchema): Promise<
  ActionResponse<{
    items: (Job & { _count: { applications: number } })[];
    nextCursor: string | undefined;
  }>
> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const validatedPayload = getMyJobsSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { cursor, limit, type } = validatedPayload.data;

  try {
    const whereClause =
      type === "posted"
        ? { posterId: stackUser.id }
        : type === "applied"
          ? { applications: { some: { userId: stackUser.id } } }
          : {
              OR: [
                { posterId: stackUser.id },
                { applications: { some: { userId: stackUser.id } } },
              ],
            };

    const jobs = await prisma.job.findMany({
      where: whereClause,
      include: {
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    });

    const hasMore = jobs.length > limit;
    const items = hasMore ? jobs.slice(0, -1) : jobs;
    const nextCursor = hasMore ? items[items.length - 1].id : undefined;

    return {
      success: true,
      message: "Jobs fetched successfully",
      data: { items, nextCursor },
    };
  } catch (error) {
    console.error("Error getting my jobs", error);
    throw new Error("Database error");
  }
}
