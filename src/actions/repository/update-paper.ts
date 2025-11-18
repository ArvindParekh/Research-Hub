"use server";
import {
  updateRepositoryPaperSchema,
  UpdateRepositoryPaperSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { RepositoryPaper } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function updateRepositoryPaper(
  payload: UpdateRepositoryPaperSchema,
): Promise<ActionResponse<{ paper: RepositoryPaper }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = updateRepositoryPaperSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { paperId, title, abstract, categoryId, keywords } =
    validatedPayload.data;

  try {
    // check if user is one of the authors
    const existingPaper = await prisma.repositoryPaper.findUnique({
      where: { id: paperId },
      include: { authors: true },
    });

    if (!existingPaper) {
      return {
        success: false,
        message: "Paper not found",
        data: null,
      };
    }

    const isAuthor = existingPaper.authors.some(
      (author) => author.userId === stackUser.id,
    );

    if (!isAuthor) {
      return {
        success: false,
        message: "Only authors can update the paper",
        data: null,
      };
    }

    // only allow updates if paper is Draft
    if (existingPaper.status !== "Draft") {
      return {
        success: false,
        message: "Cannot update paper after submission",
        data: null,
      };
    }

    const paper = await prisma.repositoryPaper.update({
      where: { id: paperId },
      data: {
        ...(title && { title }),
        ...(abstract !== undefined && { abstract }),
        ...(categoryId !== undefined && { categoryId }),
        ...(keywords && {
          keywords: {
            set: [], // disconnect all existing keywords
            connectOrCreate: keywords.map((keyword) => ({
              where: { keyword },
              create: { keyword },
            })),
          },
        }),
      },
    });

    return {
      success: true,
      message: "Paper updated successfully",
      data: { paper },
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        message: "Paper not found",
        data: null,
      };
    }
    console.error("Error updating paper", error);
    throw new Error("Database error");
  }
}
