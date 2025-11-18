"use server";
import {
  getGroupSchema,
  GetGroupSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Group } from "@/generated/prisma/client";

export async function getGroup(payload: GetGroupSchema): Promise<
  ActionResponse<{
    group: Group & {
      leader: {
        id: string;
        firstName: string | null;
        lastName: string | null;
      };
      _count: { members: number };
    };
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

  const validatedPayload = getGroupSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { groupId } = validatedPayload.data;

  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        leader: { select: { id: true, firstName: true, lastName: true } },
        _count: { select: { members: { where: { status: "Active" } } } },
      },
    });

    if (!group) {
      return {
        success: false,
        message: "Group not found",
        data: null,
      };
    }

    return {
      success: true,
      message: "Group fetched successfully",
      data: { group },
    };
  } catch (error) {
    console.error("Error getting group", error);
    throw new Error("Database error");
  }
}
