"use server";
import {
  getMyGroupsSchema,
  GetMyGroupsSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Group } from "@/generated/prisma/client";

export async function getMyGroups(payload: GetMyGroupsSchema): Promise<
  ActionResponse<{
    items: (Group & { _count: { members: number } })[];
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

  const validatedPayload = getMyGroupsSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { cursor, limit, status } = validatedPayload.data;

  try {
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            userId: stackUser.id,
            ...(status && { status }),
          },
        },
      },
      include: {
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
    console.error("Error getting my groups", error);
    throw new Error("Database error");
  }
}
