"use server";
import {
   getGroupMembersSchema,
   GetGroupMembersSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { GroupMember } from "@prisma/client";

export async function getGroupMembers(payload: GetGroupMembersSchema): Promise<
   ActionResponse<{
      items: (GroupMember & {
         user: {
            id: string;
            firstName: string | null;
            lastName: string | null;
         };
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

   const validatedPayload = getGroupMembersSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { groupId, cursor, limit, status } = validatedPayload.data;

   try {
      const members = await prisma.groupMember.findMany({
         where: {
            groupId,
            ...(status && { status }),
         },
         include: {
            user: { select: { id: true, firstName: true, lastName: true } },
         },
         orderBy: { joinedAt: "desc" },
         take: limit + 1,
         ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      });

      const hasMore = members.length > limit;
      const items = hasMore ? members.slice(0, -1) : members;
      const nextCursor = hasMore ? items[items.length - 1].id : undefined;

      return {
         success: true,
         message: "Members fetched successfully",
         data: { items, nextCursor },
      };
   } catch (error) {
      console.error("Error getting group members", error);
      throw new Error("Database error");
   }
}
