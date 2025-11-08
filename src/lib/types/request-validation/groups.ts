import { z } from "zod";
import { GroupMemberRole, GroupVisibility } from "@/generated/prisma/client";

export const createGroupSchema = z
   .object({
      name: z.string().min(1).max(255),
      description: z.string().max(1000).optional(),
      field: z.string().max(255).optional(),
      visibility: z.nativeEnum(GroupVisibility).default("Public"),
      joinRequiresApproval: z.boolean().default(false),
   })
   .strict();

export const joinGroupSchema = z
   .object({
      groupId: z.string().uuid(),
   })
   .strict();

// Schema
export const approveGroupMemberSchema = z
   .object({
      groupId: z.string().uuid(),
      userId: z.string().uuid(),
      action: z.enum(["approve", "reject"]),
   })
   .strict();

export const leaveGroupSchema = z
   .object({
      groupId: z.string().uuid(),
   })
   .strict();

export const updateGroupMembershipSchema = z
   .object({
      groupId: z.string().uuid(),
      userId: z.string().uuid(),
      role: z.nativeEnum(GroupMemberRole).optional(),
      isAdmin: z.boolean().optional(),
   })
   .strict()
   .refine((data) => data.role !== undefined || data.isAdmin !== undefined, {
      message: "Must provide role or isAdmin to update",
   });

export type CreateGroupSchema = z.infer<typeof createGroupSchema>;
export type JoinGroupSchema = z.infer<typeof joinGroupSchema>;
export type ApproveGroupMemberSchema = z.infer<typeof approveGroupMemberSchema>;
export type LeaveGroupSchema = z.infer<typeof leaveGroupSchema>;
export type UpdateGroupMembershipSchema = z.infer<
   typeof updateGroupMembershipSchema
>;
