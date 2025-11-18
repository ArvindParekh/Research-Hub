"use server";
import {
  getPendingGroupRequestsSchema,
  GetPendingGroupRequestsSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { GroupMember } from "@/generated/prisma/client";

export async function getPendingGroupRequests(
  payload: GetPendingGroupRequestsSchema,
): Promise<
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
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = getPendingGroupRequestsSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return { success: false, message: "Invalid payload", data: null };
  }

  const { groupId, cursor, limit } = validatedPayload.data;

  try {
    // make sure requester is admin or leader
    const requesterMembership = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId: stackUser.id } },
      select: { isAdmin: true, group: { select: { leaderId: true } } },
    });

    if (
      !requesterMembership ||
      (!requesterMembership.isAdmin &&
        requesterMembership.group.leaderId !== stackUser.id)
    ) {
      return {
        success: false,
        message: "Only admins or leader can view pending requests",
        data: null,
      };
    }

    const pendingMembers = await prisma.groupMember.findMany({
      where: {
        groupId,
        status: "Pending",
      },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: "asc" }, // ? keep oldest first?
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    });

    const hasMore = pendingMembers.length > limit;
    const items = hasMore ? pendingMembers.slice(0, -1) : pendingMembers;
    const nextCursor = hasMore ? items[items.length - 1].id : undefined;

    return {
      success: true,
      message: "Pending requests fetched successfully",
      data: { items, nextCursor },
    };
  } catch (error) {
    console.error("Error getting pending requests", error);
    throw new Error("Database error");
  }
}
