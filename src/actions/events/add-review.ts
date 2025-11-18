"use server";
import {
  addEventReviewSchema,
  AddEventReviewSchema,
} from "@/lib/types/request-validation/events";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { EventReview } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function addEventReview(
  payload: AddEventReviewSchema,
): Promise<ActionResponse<{ review: EventReview }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = addEventReviewSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { eventId, rating, comment } = validatedPayload.data;

  try {
    // no hecklers - make sure user attended the event, or atleast registered for it
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: { eventId, userId: stackUser.id },
      },
    });

    if (!registration) {
      return {
        success: false,
        message: "Must be registered to review event",
        data: null,
      };
    }

    const review = await prisma.eventReview.create({
      data: {
        eventId,
        userId: stackUser.id,
        rating,
        comment,
      },
    });

    return {
      success: true,
      message: "Review added successfully",
      data: { review },
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "You have already reviewed this event",
        data: null,
      };
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return { success: false, message: "Event not found", data: null };
    }
    console.error("Error adding review", error);
    throw new Error("Database error");
  }
}
