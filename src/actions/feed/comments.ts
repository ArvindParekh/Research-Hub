"use server";

import { stackServerApp } from "@/stack/server";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { PostComment, Prisma } from "@/generated/prisma/client";
import {
  addPostCommentSchema,
  type AddPostCommentSchema,
} from "@/lib/types/request-validation/feed";

export async function addPostComment(
  payload: AddPostCommentSchema,
): Promise<ActionResponse<PostComment>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const validatedPayload = addPostCommentSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { postId, content, parentCommentId } = validatedPayload.data;

  try {
    const newComment = await prisma.postComment.create({
      data: {
        postId,
        userId: stackUser.id,
        content,
        parentCommentId,
      },
    });

    return {
      success: true,
      message: "Comment added successfully",
      data: newComment,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return {
        success: false,
        message: "Post, or parent comment not found",
        data: null,
      };
    }
    console.error("Error adding comment", error);
    throw new Error("Database error");
  }
}
