"use server";

import { stackServerApp } from "@/stack/server";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { Post } from "@/generated/prisma/client";
import {
  getUserFeedSchema,
  GetUserFeedSchema,
} from "@/lib/types/request-validation/feed";

export async function getUserFeed(
  payload: GetUserFeedSchema,
): Promise<ActionResponse<{ posts: Post[]; nextCursor?: string }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = getUserFeedSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }
  const { cursor, limit } = validatedPayload.data;

  try {
    const posts = await prisma.post.findMany({
      where: {
        deletedAt: null,
        OR: [
          { visibility: "Public" },
          {
            visibility: "Connections",
            author: {
              followers: {
                some: { followerId: stackUser.id, status: "Accepted" },
              },
            },
          },
          { authorId: stackUser.id }, // own posts
        ],
      },
      include: {
        author: { select: { id: true, firstName: true, lastName: true } },
        reactions: {
          select: { type: true, userId: true },
          where: { userId: stackUser.id },
        },
        bookmarks: {
          select: { id: true },
          where: { userId: stackUser.id },
        },
        comments: { select: { id: true } },
        _count: {
          select: { reactions: true, comments: true, bookmarks: true },
        },
        attachments: true,
      },
      orderBy: { createdAt: "desc" },
      take: (limit ?? 20) + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
    });

    const hasMore = posts.length > (limit ?? 20); // default limit is 20
    const rawItems = hasMore ? posts.slice(0, -1) : posts;

    // Add user interaction flags
    const items = rawItems.map((post) => ({
      ...post,
      isLikedByUser: post.reactions.length > 0,
      isBookmarkedByUser: post.bookmarks.length > 0,
    }));

    const nextCursor = hasMore ? items[items.length - 1].id : undefined;

    return {
      success: true,
      message: "Feed fetched successfully",
      data: { posts: items as any, nextCursor },
    };
  } catch (error) {
    console.error("Error fetching feed", error);
    throw new Error("Database error");
  }
}
