"use server";
import {
   deleteEventSchema,
   DeleteEventSchema,
} from "@/lib/types/request-validation/events";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function deleteEvent(
   payload: DeleteEventSchema
): Promise<ActionResponse<{ isDeleted: boolean }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = deleteEventSchema.safeParse(payload);
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
      // only organizer can delete
      await prisma.event.delete({
         where: {
            id: eventId,
            organizerId: stackUser.id,
         },
      });

      return {
         success: true,
         message: "Event deleted successfully",
         data: { isDeleted: true },
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
      console.error("Error deleting event", error);
      throw new Error("Database error");
   }
}
