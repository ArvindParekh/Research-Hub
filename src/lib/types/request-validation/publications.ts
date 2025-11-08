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

export type AddPublicationSchema = z.infer<typeof addPublicationSchema>;
export type UpdatePublicationSchema = z.infer<typeof updatePublicationSchema>;
export type DeletePublicationSchema = z.infer<typeof deletePublicationSchema>;
