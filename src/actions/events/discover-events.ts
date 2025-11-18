"use server";
import {
   discoverEventsSchema,
   DiscoverEventsSchema,
} from "@/lib/types/request-validation/events";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Event } from "@prisma/client";

export async function discoverEvents(payload: DiscoverEventsSchema): Promise<
   ActionResponse<{
      items: (Event & {
         organizer: {
            id: string;
            firstName: string | null;
            lastName: string | null;
         } | null;
         _count: { registrations: number };
      })[];
      nextCursor: string | undefined;
   }>
> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = discoverEventsSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return { success: false, message: "Invalid payload", data: null };
   }

   const {
      cursor,
      limit,
      type,
      format,
      query,
      startAfter,
      isFeatured,
      isLive,
   } = validatedPayload.data;

   try {
      const events = await prisma.event.findMany({
         where: {
            ...(type && { type }),
            ...(format && { format }),
            ...(query && { title: { contains: query, mode: "insensitive" } }),
            ...(startAfter && { startDate: { gte: new Date(startAfter) } }),
            ...(isFeatured !== undefined && { isFeatured }),
            ...(isLive !== undefined && { isLive }),
         },
         include: {
            organizer: {
               select: { id: true, firstName: true, lastName: true },
            },
            _count: { select: { registrations: true } },
         },
         orderBy: [
            { isFeatured: "desc" }, // featured first - because money is important :)
            { startDate: "asc" }, // and upcoming events first
         ],
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
      console.error("Error discovering events", error);
      throw new Error("Database error");
   }
}
