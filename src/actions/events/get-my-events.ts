"use server";
import {
   getMyEventsSchema,
   GetMyEventsSchema,
} from "@/lib/types/request-validation/events";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Event } from "@prisma/client";

export async function getMyEvents(payload: GetMyEventsSchema): Promise<
   ActionResponse<{
      items: (Event & { _count: { registrations: number } })[];
      nextCursor: string | undefined;
   }>
> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = getMyEventsSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { cursor, limit, type } = validatedPayload.data;

   try {
      const whereClause =
         type === "organized"
            ? { organizerId: stackUser.id }
            : type === "registered"
              ? { registrations: { some: { userId: stackUser.id } } }
              : {
                   OR: [
                      { organizerId: stackUser.id },
                      { registrations: { some: { userId: stackUser.id } } },
                   ],
                };

      const events = await prisma.event.findMany({
         where: whereClause,
         include: {
            _count: { select: { registrations: true } },
         },
         orderBy: { startDate: "desc" },
         take: limit + 1,
         ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      });

      const hasMore = events.length > limit;
      const items = hasMore ? events.slice(0, -1) : events;
      const nextCursor = hasMore ? items[items.length - 1].id : undefined;

      return {
         success: true,
         message: "Events fetched successfully",
         data: { items, nextCursor },
      };
   } catch (error) {
      console.error("Error getting my events", error);
      throw new Error("Database error");
   }
}
