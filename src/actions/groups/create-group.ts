"use server";

import {
  createGroupSchema,
  CreateGroupSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Group } from "@/generated/prisma/client";

export async function createGroup(
  payload: CreateGroupSchema,
): Promise<ActionResponse<{ group: Group }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const validatedPayload = createGroupSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { name, description, field, visibility, joinRequiresApproval } =
    validatedPayload.data;

  try {
    const newGroup = await prisma.group.create({
      data: {
        name,
        description,
        field,
        visibility,
        joinRequiresApproval,
        leaderId: stackUser.id,
        members: {
          create: {
            userId: stackUser.id,
            role: "Founder",
            isAdmin: true,
            status: "Active",
          },
        },
      },
    });

    return {
      success: true,
      message: "Group created successfully",
      data: { group: newGroup },
    };
  } catch (error) {
    console.error("Error creating group", error);
    throw new Error("Database error");
  }
}
