"use server";
import {
   updateEventSchema,
   UpdateEventSchema,
} from "@/lib/types/request-validation/events";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Event } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function updateEvent(
   payload: UpdateEventSchema
): Promise<ActionResponse<{ event: Event }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = updateEventSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { eventId, ...updateData } = validatedPayload.data;

   const processedData = {
      ...updateData,
      ...(updateData.startDate && {
         startDate: new Date(updateData.startDate),
      }),
      ...(updateData.endDate && { endDate: new Date(updateData.endDate) }),
   };

   try {
      const updatedEvent = await prisma.event.update({
         where: {
            id: eventId,
            organizerId: stackUser.id, // this makes sure only organizer can update, and p2025 handles the rest
         },
         data: processedData,
      });

      return {
         success: true,
         message: "Event updated successfully",
         data: { event: updatedEvent },
      };
   } catch (error) {
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2025"
      ) {
         return {
            success: false,
            message: "Event not found or you are not the organizer",
            data: null,
         };
      }
      console.error("Error updating event", error);
      throw new Error("Database error");
   }
}
