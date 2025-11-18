"use server";
import {
  updatePublicationSchema,
  UpdatePublicationSchema,
} from "@/lib/types/request-validation/publications";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Publication } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function updatePublication(
  payload: UpdatePublicationSchema,
): Promise<ActionResponse<{ publication: Publication }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = updatePublicationSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { publicationId, authorIds, publicationDate, ...updateData } =
    validatedPayload.data;

  try {
    // check if user is an author - only authors can update their publications
    const publication = await prisma.publication.findUnique({
      where: { id: publicationId },
      select: { authors: { select: { id: true } } },
    });

    if (!publication) {
      return {
        success: false,
        message: "Publication not found",
        data: null,
      };
    }

    const isAuthor = publication.authors.some((a) => a.id === stackUser.id);
    if (!isAuthor) {
      return {
        success: false,
        message: "Only authors can update this publication",
        data: null,
      };
    }

    const updatedPublication = await prisma.publication.update({
      where: { id: publicationId },
      data: {
        ...updateData,
        ...(publicationDate && {
          publicationDate: new Date(publicationDate),
        }),
        ...(authorIds && {
          authors: {
            set: authorIds.map((id) => ({ id })),
          },
        }),
      },
    });

    return {
      success: true,
      message: "Publication updated successfully",
      data: { publication: updatedPublication },
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "DOI already exists",
        data: null,
      };
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        message: "One or more authors not found",
        data: null,
      };
    }
    console.error("Error updating publication", error);
    throw new Error("Database error");
  }
}
