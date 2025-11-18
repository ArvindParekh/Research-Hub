"use server";
import {
  cancelEventRegistrationSchema,
  CancelEventRegistrationSchema,
} from "@/lib/types/request-validation/events";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";

export async function cancelEventRegistration(
  payload: CancelEventRegistrationSchema,
): Promise<ActionResponse<{ isCancelled: boolean }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = cancelEventRegistrationSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { eventId } = validatedPayload.data;

  try {
    const deleted = await prisma.eventRegistration.deleteMany({
      where: {
        eventId,
        userId: stackUser.id,
      },
    });

    if (deleted.count === 0) {
      return {
        success: false,
        message: "Registration not found",
        data: null,
      };
    }

    return {
      success: true,
      message: "Registration cancelled successfully",
      data: { isCancelled: true },
    };
  } catch (error) {
    console.error("Error cancelling registration", error);
    throw new Error("Database error");
  }
}
