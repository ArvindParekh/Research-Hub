"use server";

import { prisma } from "@/lib/prisma";
import {
   toggleEventBookmarkSchema,
   type ToggleEventBookmarkSchema,
} from "@/lib/types/request-validation/events";
import { stackServerApp } from "@/stack/server";
import { ActionResponse } from "@/lib/types/action-response";

export async function toggleEventBookmark(
   payload: ToggleEventBookmarkSchema
): Promise<ActionResponse<{ isBookmarked: boolean }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return {
         // return json for expected failures (validation, auth, not found, etc. throw errors for unexpected failures (db crash, network failure))
         success: false,
         message: "Unauthorized",
         data: null,
      };
   }

   const validatedPayload = toggleEventBookmarkSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { eventId } = validatedPayload.data;

   try {
      const user = await prisma.user.findUnique({
         where: {
            id: stackUser.id,
         },
         select: {
            bookmarkedEvents: {
               where: {
                  id: eventId,
               },
               select: {
                  id: true,
               },
            },
         },
      });

      const isBookmarked = (user?.bookmarkedEvents?.length ?? 0) > 0;

      await prisma.user.update({
         where: { id: stackUser.id },
         data: {
            bookmarkedEvents: {
               [isBookmarked ? "disconnect" : "connect"]: { id: eventId },
            },
         },
      });

      return {
         success: true,
         data: { isBookmarked: !isBookmarked },
         message: "Event bookmark toggled successfully",
      };
   } catch (error) {
      console.log("Error in toggleEventBookmark", error);
      throw new Error("Database error");
   }
}
