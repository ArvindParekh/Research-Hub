import { z } from "zod";
import {
   WorkMode,
   JobType,
   SalaryPeriod,
   JobStatus,
   ApplicationStatus,
} from "@/generated/prisma/client";

export const createJobSchema = z
   .object({
      title: z.string().min(1).max(255),
      description: z.string().max(5000).optional(),
      requirements: z.string().max(5000).optional(),
      responsibilities: z.string().max(5000).optional(),
      qualifications: z.string().max(5000).optional(),
      organizationName: z.string().min(1).max(255),
      department: z.string().max(255).optional(),
      organizationWebsite: z.string().url().optional(),
      location: z.string().max(255).optional(),
      workMode: z.nativeEnum(WorkMode).optional(),
      type: z.nativeEnum(JobType),
      field: z.string().max(255).optional(),
      salaryMin: z.number().optional(),
      salaryMax: z.number().optional(),
      currency: z.string().length(3).optional(), // usd, eur, etc.
      salaryPeriod: z.nativeEnum(SalaryPeriod).optional(),
      applicationDeadline: z.string().datetime().optional(),
      startDate: z.string().datetime().optional(),
      contactEmail: z.string().email().optional(),
      applicationUrl: z.string().url().optional(),
   })
   .strict()
   .refine(
      (data) => {
         if (data.salaryMin && data.salaryMax) {
            return data.salaryMax >= data.salaryMin;
         }
         return true;
      },
      { message: "Max salary must be greater than or equal to min salary" }
   );

export const updateJobSchema = z
   .object({
      jobId: z.string().uuid(),
      title: z.string().min(1).max(255).optional(),
      description: z.string().max(5000).optional(),
      requirements: z.string().max(5000).optional(),
      responsibilities: z.string().max(5000).optional(),
      qualifications: z.string().max(5000).optional(),
      organizationName: z.string().min(1).max(255).optional(),
      department: z.string().max(255).optional(),
      organizationWebsite: z.string().url().optional(),
      location: z.string().max(255).optional(),
      workMode: z.nativeEnum(WorkMode).optional(),
      type: z.nativeEnum(JobType).optional(),
      field: z.string().max(255).optional(),
      salaryMin: z.number().optional(),
      salaryMax: z.number().optional(),
      currency: z.string().length(3).optional(),
      salaryPeriod: z.nativeEnum(SalaryPeriod).optional(),
      applicationDeadline: z.string().datetime().optional(),
      startDate: z.string().datetime().optional(),
      contactEmail: z.string().email().optional(),
      applicationUrl: z.string().url().optional(),
      status: z.nativeEnum(JobStatus).optional(),
      isFeatured: z.boolean().optional(),
   })
   .strict()
   .refine(
      (data) => {
         const { jobId, ...updateFields } = data;
         return Object.keys(updateFields).length > 0;
      },
      { message: "At least one field to update is required" }
   )
   .refine(
      (data) => {
         if (data.salaryMin && data.salaryMax) {
            return data.salaryMax >= data.salaryMin;
         }
         return true;
      },
      { message: "Max salary must be greater than or equal to min salary" }
   );

export const deleteJobSchema = z
   .object({
      jobId: z.string().uuid(),
   })
   .strict();

export const applyForJobSchema = z
   .object({
      jobId: z.string().uuid(),
      coverLetter: z.string().max(5000).optional(),
      resumeUrl: z.string().url().optional(),
      additionalDocuments: z.array(z.string().url()).optional(),
      contactEmail: z.string().email().optional(),
      contactPhone: z.string().max(50).optional(),
      availableFrom: z.string().datetime().optional(),
      notes: z.string().max(2000).optional(),
   })
   .strict();

export const withdrawJobApplicationSchema = z
   .object({
      jobId: z.string().uuid(),
   })
   .strict();

export const updateApplicationStatusSchema = z
   .object({
      applicationId: z.string().uuid(),
      status: z.nativeEnum(ApplicationStatus),
      employerNotes: z.string().max(2000).optional(),
   })
   .strict();

export const getJobSchema = z
   .object({
      jobId: z.string().uuid(),
   })
   .strict();

export const getMyJobsSchema = z
   .object({
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(20),
      type: z.enum(["posted", "applied", "all"]).default("all"),
   })
   .strict();

export const discoverJobsSchema = z
   .object({
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(20),
      type: z.nativeEnum(JobType).optional(),
      workMode: z.nativeEnum(WorkMode).optional(),
      field: z.string().optional(),
      location: z.string().optional(),
      query: z.string().optional(), // search by title/organization
      status: z.nativeEnum(JobStatus).optional(),
      isFeatured: z.boolean().optional(),
   })
   .strict();

export type CreateJobSchema = z.infer<typeof createJobSchema>;
export type UpdateJobSchema = z.infer<typeof updateJobSchema>;
export type DeleteJobSchema = z.infer<typeof deleteJobSchema>;
export type ApplyForJobSchema = z.infer<typeof applyForJobSchema>;
export type WithdrawJobApplicationSchema = z.infer<
   typeof withdrawJobApplicationSchema
>;
export type UpdateApplicationStatusSchema = z.infer<
   typeof updateApplicationStatusSchema
>;
export type GetJobSchema = z.infer<typeof getJobSchema>;
export type GetMyJobsSchema = z.infer<typeof getMyJobsSchema>;
export type DiscoverJobsSchema = z.infer<typeof discoverJobsSchema>;
