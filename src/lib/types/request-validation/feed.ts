import { z } from "zod";
import {
   PostType,
   PostVisibility,
   ReactionType,
   AttachmentType,
} from "@prisma/client";

export const createPostSchema = z
   .object({
      content: z.string().min(1).max(1000).optional(),
      type: z.nativeEnum(PostType),
      visibility: z.nativeEnum(PostVisibility),
      sharedPublicationId: z.string().uuid().optional(),
      sharedEventId: z.string().uuid().optional(),
      sharedJobId: z.string().uuid().optional(),
      sharedPaperId: z.string().uuid().optional(),
      originalPostId: z.string().uuid().optional(),
      isQuote: z.boolean().optional(),
      attachments: z
         .array(
            z.object({
               type: z.nativeEnum(AttachmentType),
               url: z.string().url(),
               fileName: z.string().optional(),
               fileSize: z.number().optional(),
               mimeType: z.string().optional(),
            })
         )
         .optional(),
   })
   .strict()
   .refine(
      (data) => {
         const sharedCount = [
            data.sharedPublicationId,
            data.sharedEventId,
            data.sharedJobId,
            data.sharedPaperId,
         ].filter(Boolean).length;
         return sharedCount <= 1;
      },
      { message: "Can only share one item at a time" }
   )
   .refine(
      (data) => {
         return (
            data.content ||
            data.sharedPublicationId ||
            data.sharedEventId ||
            data.sharedJobId ||
            data.sharedPaperId ||
            data.originalPostId ||
            (data.attachments && data.attachments.length > 0)
         );
      },
      { message: "At least one content or attachment is required" }
   );

export const togglePostReactionSchema = z
   .object({
      postId: z.string().uuid(),
      reactionType: z.nativeEnum(ReactionType),
   })
   .strict();

export const addPostCommentSchema = z
   .object({
      postId: z.string().uuid(),
      content: z.string().min(1).max(1000),
      parentCommentId: z.string().uuid().optional(),
   })
   .strict();

export const togglePostBookmarkSchema = z
   .object({
      postId: z.string().uuid(),
   })
   .strict();

export const deletePostSchema = z
   .object({
      postId: z.string().uuid(),
   })
   .strict();

export const getUserFeedSchema = z
   .object({
      cursor: z.string().uuid().optional(), // cursor is the id of the last post in the previous page
      limit: z.number().min(1).max(100).optional(), // limit denotes the number of posts to fetch
   })
   .strict();

export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type TogglePostReactionSchema = z.infer<typeof togglePostReactionSchema>;
export type AddPostCommentSchema = z.infer<typeof addPostCommentSchema>;
export type TogglePostBookmarkSchema = z.infer<typeof togglePostBookmarkSchema>;
export type DeletePostSchema = z.infer<typeof deletePostSchema>;
export type GetUserFeedSchema = z.infer<typeof getUserFeedSchema>;
