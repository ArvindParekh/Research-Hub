"use server";
import {
  discoverJobsSchema,
  DiscoverJobsSchema,
} from "@/lib/types/request-validation/jobs";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Job } from "@/generated/prisma/client";

export async function discoverJobs(payload: DiscoverJobsSchema): Promise<
  ActionResponse<{
    items: (Job & {
      poster: {
        id: string;
        firstName: string | null;
        lastName: string | null;
      } | null;
      _count: { applications: number };
    })[];
    nextCursor: string | undefined;
  }>
> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = discoverJobsSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const {
    cursor,
    limit,
    type,
    workMode,
    field,
    location,
    query,
    status,
    isFeatured,
  } = validatedPayload.data;

  try {
    const jobs = await prisma.job.findMany({
      where: {
        ...(type && { type }),
        ...(workMode && { workMode }),
        ...(field && { field }),
        ...(location && {
          location: { contains: location, mode: "insensitive" },
        }),
        ...(query && {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            {
              organizationName: { contains: query, mode: "insensitive" },
            },
          ],
        }),
        ...(status ? { status } : { status: "Open" }), // default to open jobs
        ...(isFeatured !== undefined && { isFeatured }),
      },
      include: {
        poster: { select: { id: true, firstName: true, lastName: true } },
        _count: { select: { applications: true } },
      },
      orderBy: [
        { isFeatured: "desc" }, // ofc featured first
        { createdAt: "desc" },
      ],
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
    console.error("Error discovering jobs", error);
    throw new Error("Database error");
  }
}
