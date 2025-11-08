import { z } from "zod";

export const updateUserProfileSchema = z
   .object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(), // todo: not sure how to handle email, since it's managed by stack auth
      designation: z.string(),
      institution: z.string(),
      title: z.string(),
      bio: z.string(),
      location: z.string(),
      website: z.string(),
   })
   .partial()
   .strict();

export type UpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;
