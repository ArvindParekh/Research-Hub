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

export const pendingConnectionRequestsSchema = z
  .object({
    cursor: z.string().uuid().optional(),
    limit: z.number().min(1).max(100).default(10),
  })
  .strict();

// using the same schema for both followers and following, since essentially require the same info
export const getFollowersOrFollowingSchema = z
  .object({
    userId: z.string().uuid().optional(), // if empty, get for authenticated user
    cursor: z.string().uuid().optional(),
    limit: z.number().min(1).max(100).default(10),
  })
  .strict();

export type SendConnectionRequestSchema = z.infer<
  typeof sendConnectionRequestSchema
>;
export type RespondConnectionRequestSchema = z.infer<
  typeof respondConnectionRequestSchema
>;
export type UnfollowUserSchema = z.infer<typeof unfollowUserSchema>;
export type PendingConnectionRequestsSchema = z.infer<
  typeof pendingConnectionRequestsSchema
>;
export type GetFollowersOrFollowingSchema = z.infer<
  typeof getFollowersOrFollowingSchema
>;
