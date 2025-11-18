"use server";

import { stackServerApp } from "@/stack/server";
import {
  updateUserProfileSchema,
  type UpdateUserProfileSchema,
} from "@/lib/types/request-validation/user-profile";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { User } from "@/generated/prisma/client";

export async function updateUserProfile(
  payload: UpdateUserProfileSchema,
): Promise<ActionResponse<{ user: User }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const validatedPayload = updateUserProfileSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: stackUser.id },
      data: validatedPayload.data,
    });

    return {
      success: true,
      message: "User profile updated successfully",
      data: { user: updatedUser },
    };
  } catch (error) {
    console.error("Error updating user profile", error);
    throw new Error("Database error");
  }
}
