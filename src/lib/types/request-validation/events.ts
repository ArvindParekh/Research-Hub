import { EventFormat, EventType } from "@/generated/prisma/client";
import { z } from "zod";

export const createEventSchema = z
   .object({
      title: z.string().min(1).max(255),
      subtitle: z.string().max(255).optional(),
      description: z.string().max(5000).optional(),
      type: z.nativeEnum(EventType),
      format: z.nativeEnum(EventFormat),
      startDate: z.string().datetime(),
      endDate: z.string().datetime(),
      timezone: z.string().optional(),
      price: z.string().max(50).optional(),
      currency: z.string().length(3).optional(), // usd, eur, etc.
      image: z.string().url().optional(),
      website: z.string().url().optional(),
      maxAttendees: z.number().min(1).optional(),
   })
   .strict()
   .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
      message: "End date must be after start date",
   });

export const updateEventSchema = z
   .object({
      eventId: z.string().uuid(),
      title: z.string().min(1).max(255).optional(),
      subtitle: z.string().max(255).optional(),
      description: z.string().max(5000).optional(),
      fullDescription: z.string().optional(),
      type: z.nativeEnum(EventType).optional(),
      format: z.nativeEnum(EventFormat).optional(),
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      timezone: z.string().optional(),
      price: z.string().max(50).optional(),
      currency: z.string().length(3).optional(),
      image: z.string().url().optional(),
      website: z.string().url().optional(),
      maxAttendees: z.number().min(1).optional(),
      isLive: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
   })
   .strict()
   .refine(
      (data) => {
         const { eventId, ...updateFields } = data;
         return Object.keys(updateFields).length > 0;
      },
      { message: "At least one field to update is required" }
   )
   .refine(
      (data) => {
         if (data.startDate && data.endDate) {
            return new Date(data.endDate) > new Date(data.startDate);
         }
         return true;
      },
      { message: "End date must be after start date" }
   );

export const deleteEventSchema = z
   .object({
      eventId: z.string().uuid(),
   })
   .strict();

export type CreateEventSchema = z.infer<typeof createEventSchema>;
export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
export type DeleteEventSchema = z.infer<typeof deleteEventSchema>;
export const toggleEventBookmarkSchema = z
   .object({
      eventId: z.string().uuid(),
   })
   .strict();

export const registerForEventSchema = z
   .object({
      eventId: z.string().uuid(),
   })
   .strict();

export type ToggleEventBookmarkSchema = z.infer<
   typeof toggleEventBookmarkSchema
>;
export type RegisterForEventSchema = z.infer<typeof registerForEventSchema>;
