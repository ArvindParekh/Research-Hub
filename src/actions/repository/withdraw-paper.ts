"use server";
import {
  withdrawPaperSchema,
  WithdrawPaperSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function withdrawPaper(
  payload: WithdrawPaperSchema,
): Promise<ActionResponse<{ withdrawn: boolean }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = withdrawPaperSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { paperId } = validatedPayload.data;

  try {
    // check if user is an author
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
        message: "Only authors can withdraw the paper",
        data: null,
      };
    }

    if (existingPaper.status === "Withdrawn") {
      return {
        success: false,
        message: "Paper is already withdrawn",
        data: null,
      };
    }

    await prisma.repositoryPaper.update({
      where: { id: paperId },
      data: { status: "Withdrawn" },
    });

    return {
      success: true,
      message: "Paper withdrawn successfully",
      data: { withdrawn: true },
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
    console.error("Error withdrawing paper", error);
    throw new Error("Database error");
  }
}
