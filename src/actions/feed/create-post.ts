"use server";

import { stackServerApp } from "@/stack/server";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { Post, Prisma } from "@/generated/prisma/client";
import {
  createPostSchema,
  type CreatePostSchema,
} from "@/lib/types/request-validation/feed";

export async function createPost(
  payload: CreatePostSchema,
): Promise<ActionResponse<Post>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const validatedPayload = createPostSchema.safeParse(payload);
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
    content,
    type,
    visibility,
    sharedPublicationId,
    sharedEventId,
    sharedJobId,
    sharedPaperId,
    originalPostId,
    isQuote,
    attachments,
  } = validatedPayload.data;

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        type,
        visibility,
        authorId: stackUser.id,
        sharedPublicationId,
        sharedEventId,
        sharedJobId,
        sharedPaperId,
        originalPostId,
        isQuote,
        attachments: attachments
          ? {
              create: attachments,
            }
          : undefined,
      },
    });

    return {
      success: true,
      message: "Post created successfully",
      data: newPost,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return {
        success: false,
        message: "Shared item not found",
        data: null,
      };
    }
    console.error("Error creating post", error);
    throw new Error("Database error");
  }
}
