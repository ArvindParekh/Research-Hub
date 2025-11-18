"use server";
import {
  getPaperReviewsSchema,
  GetPaperReviewsSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PaperReview } from "@/generated/prisma/client";

export async function getPaperReviews(payload: GetPaperReviewsSchema): Promise<
  ActionResponse<{
    items: (PaperReview & {
      user: {
        id: string;
        firstName: string | null;
        lastName: string | null;
      } | null;
    })[];
    nextCursor?: string;
  }>
> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = getPaperReviewsSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { paperId, cursor, limit } = validatedPayload.data;

  try {
    const reviews = await prisma.paperReview.findMany({
      where: { paperId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: [{ helpfulCount: "desc" }, { createdAt: "desc" }],
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    });

    const hasMore = reviews.length > limit;
    const items = hasMore ? reviews.slice(0, -1) : reviews;
    const nextCursor = hasMore ? items[items.length - 1].id : undefined;

    return {
      success: true,
      message: "Reviews fetched successfully",
      data: { items, nextCursor },
    };
  } catch (error) {
    console.error("Error fetching reviews", error);
    throw new Error("Database error");
  }
}
