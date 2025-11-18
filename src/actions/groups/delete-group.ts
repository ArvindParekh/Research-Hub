"use server";
import {
  deleteGroupSchema,
  DeleteGroupSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function deleteGroup(
  payload: DeleteGroupSchema,
): Promise<ActionResponse<{ isDeleted: boolean }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = deleteGroupSchema.safeParse(payload);
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
    await prisma.group.delete({
      where: {
        id: groupId,
        leaderId: stackUser.id, // no need to check user's permissions here, this ensures only leader can delete, and p2025 handles the rest - avoids 2 db calls
      },
    });

    return {
      success: true,
      message: "Group deleted successfully",
      data: { isDeleted: true },
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        message: "Group not found or you are not the leader",
        data: null,
      };
    }
    console.error("Error deleting group", error);
    throw new Error("Database error");
  }
}
