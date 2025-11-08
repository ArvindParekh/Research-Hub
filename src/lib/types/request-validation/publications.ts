import { z } from "zod";

export const addPublicationSchema = z
   .object({
      title: z.string().min(1).max(500),
      abstract: z.string().max(5000).optional(),
      publicationDate: z.string().datetime().optional(),
      journal: z.string().max(255).optional(),
      doi: z.string().max(255).optional(),
      authorIds: z.array(z.string().uuid()).min(1), // at least one author
   })
   .strict();

export const updatePublicationSchema = z
   .object({
      publicationId: z.string().uuid(),
      title: z.string().min(1).max(500).optional(),
      abstract: z.string().max(5000).optional(),
      publicationDate: z.string().datetime().optional(),
      journal: z.string().max(255).optional(),
      doi: z.string().max(255).optional(),
      authorIds: z.array(z.string().uuid()).min(1).optional(),
   })
   .strict()
   .refine(
      (data) => {
         const { publicationId, ...updateFields } = data;
         return Object.keys(updateFields).length > 0;
      },
      { message: "At least one field to update is required" }
   );

export const deletePublicationSchema = z
   .object({
      publicationId: z.string().uuid(),
   })
   .strict();

export const getPublicationSchema = z
   .object({
      publicationId: z.string().uuid(),
   })
   .strict();

export const getMyPublicationsSchema = z
   .object({
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(20),
   })
   .strict();

export const discoverPublicationsSchema = z
   .object({
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(20),
      query: z.string().optional(),
      authorId: z.string().uuid().optional(),
      journal: z.string().optional(),
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
   })
   .strict();

export type AddPublicationSchema = z.infer<typeof addPublicationSchema>;
export type UpdatePublicationSchema = z.infer<typeof updatePublicationSchema>;
export type DeletePublicationSchema = z.infer<typeof deletePublicationSchema>;
export type GetPublicationSchema = z.infer<typeof getPublicationSchema>;
export type GetMyPublicationsSchema = z.infer<typeof getMyPublicationsSchema>;
export type DiscoverPublicationsSchema = z.infer<
   typeof discoverPublicationsSchema
>;
