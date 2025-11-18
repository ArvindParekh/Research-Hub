import { z } from "zod";
import {
   GroupMemberRole,
   GroupMemberStatus,
   GroupVisibility,
} from "@prisma/client";

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

export const getGroupMembersSchema = z
   .object({
      groupId: z.string().uuid(),
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(20),
      status: z.nativeEnum(GroupMemberStatus).optional(), // optionally filter by status if needed
   })
   .strict();

export const getMyGroupsSchema = z
   .object({
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(20),
      status: z.nativeEnum(GroupMemberStatus).optional(),
   })
   .strict();

export const getGroupSchema = z
   .object({
      groupId: z.string().uuid(),
   })
   .strict();

export const discoverGroupsSchema = z
   .object({
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(20),
      field: z.string().optional(),
      query: z.string().optional(),
   })
   .strict();

export const getPendingGroupRequestsSchema = z
   .object({
      groupId: z.string().uuid(),
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(20),
   })
   .strict();

// Schema
export const updateGroupSchema = z
   .object({
      groupId: z.string().uuid(),
      name: z.string().min(1).max(255).optional(),
      description: z.string().max(1000).optional(),
      fullDescription: z.string().max(5000).optional(),
      field: z.string().max(255).optional(),
      institution: z.string().max(255).optional(),
      maxMembers: z.number().min(1).max(1000).optional(),
      visibility: z.nativeEnum(GroupVisibility).optional(),
      joinRequiresApproval: z.boolean().optional(),
   })
   .strict()
   .refine(
      (data) => {
         const { groupId, ...updateFields } = data;
         return Object.keys(updateFields).length > 0;
      },
      { message: "At least one field to update is required" }
   );

export const deleteGroupSchema = z
   .object({
      groupId: z.string().uuid(),
   })
   .strict();

export type CreateGroupSchema = z.infer<typeof createGroupSchema>;
export type JoinGroupSchema = z.infer<typeof joinGroupSchema>;
export type ApproveGroupMemberSchema = z.infer<typeof approveGroupMemberSchema>;
export type LeaveGroupSchema = z.infer<typeof leaveGroupSchema>;
export type UpdateGroupMembershipSchema = z.infer<
   typeof updateGroupMembershipSchema
>;
export type GetGroupMembersSchema = z.infer<typeof getGroupMembersSchema>;
export type GetMyGroupsSchema = z.infer<typeof getMyGroupsSchema>;
export type GetGroupSchema = z.infer<typeof getGroupSchema>;
export type DiscoverGroupsSchema = z.infer<typeof discoverGroupsSchema>;
export type GetPendingGroupRequestsSchema = z.infer<
   typeof getPendingGroupRequestsSchema
>;
export type UpdateGroupSchema = z.infer<typeof updateGroupSchema>;
export type DeleteGroupSchema = z.infer<typeof deleteGroupSchema>;
