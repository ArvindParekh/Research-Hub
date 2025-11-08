import { z } from "zod";

export const sendConnectionRequestSchema = z
   .object({
      targetUserId: z.string().uuid(),
   })
   .strict();

export type SendConnectionRequestSchema = z.infer<
   typeof sendConnectionRequestSchema
>;
