import { z } from "zod";

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
