import { z } from "zod";
import { ReactionType } from "@/generated/prisma/client";

export const togglePostReactionSchema = z
   .object({
      postId: z.string().uuid(),
      reactionType: z.nativeEnum(ReactionType),
   })
   .strict();

export type TogglePostReactionSchema = z.infer<typeof togglePostReactionSchema>;
