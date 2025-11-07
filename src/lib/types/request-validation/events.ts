import { z } from "zod";

export const toggleEventBookmarkSchema = z
   .object({
      eventId: z.string().uuid(),
   })
   .strict();

export type ToggleEventBookmarkSchema = z.infer<
   typeof toggleEventBookmarkSchema
>;
