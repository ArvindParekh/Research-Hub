"use server";
import {
   getEventSchema,
   GetEventSchema,
} from "@/lib/types/request-validation/events";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Event } from "@/generated/prisma/client";

export async function getEvent(payload: GetEventSchema): Promise<
   ActionResponse<{
      event: Event & {
         organizer: {
            id: string;
            firstName: string | null;
            lastName: string | null;
         } | null;
         _count: { registrations: number; sessions: number; reviews: number };
      };
   }>
> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = getEventSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { eventId } = validatedPayload.data;

   try {
      const event = await prisma.event.findUnique({
         where: { id: eventId },
         include: {
            organizer: {
               select: { id: true, firstName: true, lastName: true },
            },
            _count: {
               select: { registrations: true, sessions: true, reviews: true },
            },
         },
      });

      if (!event) {
         return { success: false, message: "Event not found", data: null };
      }

      return {
         success: true,
         message: "Event fetched successfully",
         data: { event },
      };
   } catch (error) {
      console.error("Error getting event", error);
      throw new Error("Database error");
   }
}
