import { z } from "zod";

export const getDirectMessagesSchema = z
   .object({
      recipientId: z.string().uuid(),
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(50),
   })
   .strict();

export const getMyConversationsSchema = z
   .object({
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(20),
   })
   .strict();

export const markDirectMessageAsReadSchema = z
   .object({
      recipientId: z.string().uuid(),
   })
   .strict();

export const createChannelSchema = z
   .object({
      groupId: z.string().uuid(),
      name: z.string().min(1).max(100),
      description: z.string().max(500).optional(),
   })
   .strict();

export const sendChannelMessageSchema = z
   .object({
      channelId: z.string().uuid(),
      content: z.string().min(1).max(5000),
   })
   .strict();

export const getChannelMessagesSchema = z
   .object({
      channelId: z.string().uuid(),
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(50),
   })
   .strict();

export const addChannelMemberSchema = z
   .object({
      channelId: z.string().uuid(),
      userId: z.string().uuid(),
   })
   .strict();

export const removeChannelMemberSchema = z
   .object({
      channelId: z.string().uuid(),
      userId: z.string().uuid(),
   })
   .strict();

export const getMyChannelsSchema = z
   .object({
      groupId: z.string().uuid().optional(), // filter by group
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(20),
   })
   .strict();

export type GetDirectMessagesSchema = z.infer<typeof getDirectMessagesSchema>;
export type GetMyConversationsSchema = z.infer<typeof getMyConversationsSchema>;
export type MarkDirectMessageAsReadSchema = z.infer<
   typeof markDirectMessageAsReadSchema
>;
export type CreateChannelSchema = z.infer<typeof createChannelSchema>;
export type SendChannelMessageSchema = z.infer<typeof sendChannelMessageSchema>;
export type GetChannelMessagesSchema = z.infer<typeof getChannelMessagesSchema>;
export type AddChannelMemberSchema = z.infer<typeof addChannelMemberSchema>;
export type RemoveChannelMemberSchema = z.infer<
   typeof removeChannelMemberSchema
>;
export type GetMyChannelsSchema = z.infer<typeof getMyChannelsSchema>;
