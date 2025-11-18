"use server";

import {
  registerForEventSchema,
  type RegisterForEventSchema,
} from "@/lib/types/request-validation/events";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { EventRegistration, Prisma } from "@/generated/prisma/client";
import { stackServerApp } from "@/stack/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function registerForEvent(
  payload: RegisterForEventSchema,
): Promise<ActionResponse<EventRegistration>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const validatedPayload = registerForEventSchema.safeParse(payload);
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
    const newRegistration = await prisma.eventRegistration.create({
      data: {
        eventId,
        userId: stackUser.id,
      },
    });

    return {
      success: true,
      message: "Registered for event successfully",
      data: newRegistration,
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // prisma throws "p2002" for unique constraint violation
      return {
        success: false,
        message: "Already registered for this event",
        data: null,
      };
    }
    console.error("Error registering for event", error);
    throw new Error("Database error");
  }
}
