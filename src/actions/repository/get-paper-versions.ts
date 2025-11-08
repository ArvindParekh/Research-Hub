"use server";
import {
   getPaperVersionsSchema,
   GetPaperVersionsSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PaperVersion } from "@/generated/prisma/client";

export async function getPaperVersions(
   payload: GetPaperVersionsSchema
): Promise<ActionResponse<{ items: PaperVersion[]; nextCursor?: string }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = getPaperVersionsSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { paperId, cursor, limit } = validatedPayload.data;

   try {
      const versions = await prisma.paperVersion.findMany({
         where: { paperId },
         orderBy: { createdAt: "desc" },
         take: limit + 1,
         ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      });

      const hasMore = versions.length > limit;
      const items = hasMore ? versions.slice(0, -1) : versions;
      const nextCursor = hasMore ? items[items.length - 1].id : undefined;

      return {
         success: true,
         message: "Versions fetched successfully",
         data: { items, nextCursor },
      };
   } catch (error) {
      console.error("Error fetching versions", error);
      throw new Error("Database error");
   }
}
