"use server";
import {
  addPublicationSchema,
  AddPublicationSchema,
} from "@/lib/types/request-validation/publications";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Publication } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function addPublication(
  payload: AddPublicationSchema,
): Promise<ActionResponse<{ publication: Publication }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = addPublicationSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { title, abstract, publicationDate, journal, doi, authorIds } =
    validatedPayload.data;

  try {
    const publication = await prisma.publication.create({
      data: {
        title,
        abstract,
        ...(publicationDate && {
          publicationDate: new Date(publicationDate),
        }),
        journal,
        doi,
        authors: {
          connect: authorIds.map((id: string) => ({ id })),
        },
      },
    });

    return {
      success: true,
      message: "Publication added successfully",
      data: { publication },
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
    console.error("Error adding publication", error);
    throw new Error("Database error");
  }
}
