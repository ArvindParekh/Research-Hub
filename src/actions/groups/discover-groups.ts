"use server";
import {
   discoverGroupsSchema,
   DiscoverGroupsSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Group } from "@prisma/client";

export async function discoverGroups(payload: DiscoverGroupsSchema): Promise<
   ActionResponse<{
      items: (Group & {
         leader: {
            id: string;
            firstName: string | null;
            lastName: string | null;
         };
         _count: { members: number };
      })[];
      nextCursor: string | undefined;
   }>
> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return {
         success: false,
         message: "Unauthorized",
         data: null,
      };
   }

   const validatedPayload = discoverGroupsSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { cursor, limit, field, query } = validatedPayload.data;

   try {
      const groups = await prisma.group.findMany({
         where: {
            visibility: "Public",
            ...(field && { field }),
            ...(query && { name: { contains: query, mode: "insensitive" } }),
         },
         include: {
            leader: { select: { id: true, firstName: true, lastName: true } },
            _count: { select: { members: { where: { status: "Active" } } } },
         },
         orderBy: { createdAt: "desc" },
         take: limit + 1,
         ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      });

      const hasMore = groups.length > limit;
      const items = hasMore ? groups.slice(0, -1) : groups;
      const nextCursor = hasMore ? items[items.length - 1].id : undefined;

      return {
         success: true,
         message: "Groups fetched successfully",
         data: { items, nextCursor },
      };
   } catch (error) {
      console.error("Error discovering groups", error);
      throw new Error("Database error");
   }
}
