"use server";
import {
  createEventSchema,
  CreateEventSchema,
} from "@/lib/types/request-validation/events";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Event } from "@/generated/prisma/client";

export async function createEvent(
  payload: CreateEventSchema,
): Promise<ActionResponse<{ event: Event }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = createEventSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const {
    title,
    subtitle,
    description,
    type,
    format,
    startDate,
    endDate,
    timezone,
    price,
    currency,
    image,
    website,
    maxAttendees,
  } = validatedPayload.data;

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        subtitle,
        description,
        type,
        format,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        timezone,
        price,
        currency,
        image,
        website,
        maxAttendees,
        organizerId: stackUser.id,
      },
    });

    return {
      success: true,
      message: "Event created successfully",
      data: { event: newEvent },
    };
  } catch (error) {
    console.error("Error creating event", error);
    throw new Error("Database error");
  }
}
