"use server";
import {
  uploadPaperVersionSchema,
  UploadPaperVersionSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PaperVersion } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function uploadPaperVersion(
  payload: UploadPaperVersionSchema,
): Promise<ActionResponse<{ version: PaperVersion }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = uploadPaperVersionSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { paperId, pdfUrl, changelog } = validatedPayload.data;

  try {
    // check if user is one of the authors
    const existingPaper = await prisma.repositoryPaper.findUnique({
      where: { id: paperId },
      include: {
        authors: true,
        versions: { orderBy: { createdAt: "desc" }, take: 1 },
      },
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
        message: "Only authors can upload new versions",
        data: null,
      };
    }

    const latestVersion = existingPaper.versions[0]?.version || "v0";
    const versionNumber = parseInt(latestVersion.substring(1)) + 1;
    const newVersion = `v${versionNumber}`;

    // create new version and update paper
    const version = await prisma.paperVersion.create({
      data: {
        paperId,
        version: newVersion,
        fileUrl: pdfUrl,
        changelog,
      },
    });

    await prisma.repositoryPaper.update({
      where: { id: paperId },
      data: {
        currentVersion: newVersion,
        currentPdfUrl: pdfUrl,
      },
    });

    return {
      success: true,
      message: "New version uploaded successfully",
      data: { version },
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Version already exists",
        data: null,
      };
    }
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
    console.error("Error uploading version", error);
    throw new Error("Database error");
  }
}
