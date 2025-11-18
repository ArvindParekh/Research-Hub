"use server";
import {
  removeResearchInterestSchema,
  RemoveResearchInterestSchema,
} from "@/lib/types/request-validation/user-profile";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function removeResearchInterest(
  payload: RemoveResearchInterestSchema,
): Promise<ActionResponse<{ isRemoved: boolean }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = removeResearchInterestSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { interestId } = validatedPayload.data;

  try {
    await prisma.researchInterest.update({
      where: { id: interestId },
      data: {
        users: { disconnect: { id: stackUser.id } },
      },
    });

    return {
      success: true,
      message: "Research interest removed successfully",
      data: { isRemoved: true },
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        message: "Interest not found",
        data: null,
      };
    }
    console.error("Error removing research interest", error);
    throw new Error("Database error");
  }
}
