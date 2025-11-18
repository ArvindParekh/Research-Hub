"use server";
import {
  deletePublicationSchema,
  DeletePublicationSchema,
} from "@/lib/types/request-validation/publications";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";

export async function deletePublication(
  payload: DeletePublicationSchema,
): Promise<ActionResponse<{ isDeleted: boolean }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = deletePublicationSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { publicationId } = validatedPayload.data;

  try {
    // check if user is an author - only authors can delete their publications
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
        message: "Only authors can delete this publication",
        data: null,
      };
    }

    await prisma.publication.delete({
      where: { id: publicationId },
    });

    return {
      success: true,
      message: "Publication deleted successfully",
      data: { isDeleted: true },
    };
  } catch (error) {
    console.error("Error deleting publication", error);
    throw new Error("Database error");
  }
}
