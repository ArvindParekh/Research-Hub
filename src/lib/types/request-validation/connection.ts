import { z } from "zod";

export const sendConnectionRequestSchema = z
   .object({
      targetUserId: z.string().uuid(),
   })
   .strict();

export const respondConnectionRequestSchema = z
   .object({
      connectionId: z.string().uuid(),
      action: z.enum(["accept", "reject"]),
   })
   .strict();

export const unfollowUserSchema = z
   .object({
      targetUserId: z.string().uuid(),
   })
   .strict();

export type SendConnectionRequestSchema = z.infer<
   typeof sendConnectionRequestSchema
>;
export type RespondConnectionRequestSchema = z.infer<
   typeof respondConnectionRequestSchema
>;
export type UnfollowUserSchema = z.infer<typeof unfollowUserSchema>;
