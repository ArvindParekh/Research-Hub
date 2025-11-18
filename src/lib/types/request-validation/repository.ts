import { PaperStatus, ReviewType } from "@/generated/prisma/client";
import { z } from "zod";

export const submitRepositoryPaperSchema = z
  .object({
    title: z.string().min(1).max(500),
    abstract: z.string().max(5000),
    categoryId: z.string().uuid().optional(),
    pdfUrl: z.string().url(),
    keywords: z.array(z.string().max(100)).max(10).optional(),
    authorIds: z.array(z.string().uuid()).min(1),
  })
  .strict();

export const updateRepositoryPaperSchema = z
  .object({
    paperId: z.string().uuid(),
    title: z.string().min(1).max(500).optional(),
    abstract: z.string().max(5000).optional(),
    categoryId: z.string().uuid().optional(),
    keywords: z.array(z.string().max(100)).max(20).optional(),
  })
  .strict();

export const uploadPaperVersionSchema = z
  .object({
    paperId: z.string().uuid(),
    pdfUrl: z.string().url(),
    changelog: z.string().max(5000).optional(),
  })
  .strict();

export const addPaperReviewSchema = z
  .object({
    paperId: z.string().uuid(),
    rating: z.number().int().min(1).max(5),
    summary: z.string().max(500).optional(),
    content: z.string().max(10000).optional(),
    isAnonymous: z.boolean().default(false),
    reviewType: z.nativeEnum(ReviewType).default(ReviewType.Community),
  })
  .strict();

export const voteOnReviewSchema = z
  .object({
    reviewId: z.string().uuid(),
    isHelpful: z.boolean(),
  })
  .strict();

export const togglePaperBookmarkSchema = z
  .object({
    paperId: z.string().uuid(),
  })
  .strict();

export const getRepositoryPaperSchema = z
  .object({
    paperId: z.string().uuid(),
  })
  .strict();

export const getMyRepositoryPapersSchema = z
  .object({
    cursor: z.string().uuid().optional(),
    limit: z.number().int().min(1).max(50).default(20),
  })
  .strict();

export const searchRepositoryPapersSchema = z
  .object({
    query: z.string().max(200).optional(),
    categoryId: z.string().uuid().optional(),
    status: z.nativeEnum(PaperStatus).optional(),
    keywords: z.array(z.string()).max(10).optional(),
    cursor: z.string().uuid().optional(),
    limit: z.number().int().min(1).max(50).default(20),
  })
  .strict();

export const withdrawPaperSchema = z
  .object({
    paperId: z.string().uuid(),
  })
  .strict();

export const updatePaperStatusSchema = z
  .object({
    paperId: z.string().uuid(),
    status: z.nativeEnum(PaperStatus),
  })
  .strict();

export const getPaperReviewsSchema = z
  .object({
    paperId: z.string().uuid(),
    cursor: z.string().uuid().optional(),
    limit: z.number().int().min(1).max(50).default(20),
  })
  .strict();

export const getPaperVersionsSchema = z
  .object({
    paperId: z.string().uuid(),
    cursor: z.string().uuid().optional(),
    limit: z.number().int().min(1).max(50).default(20),
  })
  .strict();

export const addPaperCitationSchema = z
  .object({
    fromPaperId: z.string().uuid(),
    toPaperId: z.string().uuid().optional(),
    toPublicationId: z.string().uuid().optional(),
  })
  .strict()
  .refine(
    (data) => {
      const hasOne =
        (data.toPaperId && !data.toPublicationId) ||
        (!data.toPaperId && data.toPublicationId);
      return hasOne;
    },
    { message: "Must specify either toPaperId or toPublicationId, not both" },
  );

export type SubmitRepositoryPaperSchema = z.infer<
  typeof submitRepositoryPaperSchema
>;
export type UpdateRepositoryPaperSchema = z.infer<
  typeof updateRepositoryPaperSchema
>;
export type UploadPaperVersionSchema = z.infer<typeof uploadPaperVersionSchema>;
export type AddPaperReviewSchema = z.infer<typeof addPaperReviewSchema>;
export type VoteOnReviewSchema = z.infer<typeof voteOnReviewSchema>;
export type TogglePaperBookmarkSchema = z.infer<
  typeof togglePaperBookmarkSchema
>;
export type GetRepositoryPaperSchema = z.infer<typeof getRepositoryPaperSchema>;
export type GetMyRepositoryPapersSchema = z.infer<
  typeof getMyRepositoryPapersSchema
>;
export type SearchRepositoryPapersSchema = z.infer<
  typeof searchRepositoryPapersSchema
>;
export type WithdrawPaperSchema = z.infer<typeof withdrawPaperSchema>;
export type UpdatePaperStatusSchema = z.infer<typeof updatePaperStatusSchema>;
export type GetPaperReviewsSchema = z.infer<typeof getPaperReviewsSchema>;
export type GetPaperVersionsSchema = z.infer<typeof getPaperVersionsSchema>;
export type AddPaperCitationSchema = z.infer<typeof addPaperCitationSchema>;
