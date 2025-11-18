"use server";
import {
  searchRepositoryPapersSchema,
  SearchRepositoryPapersSchema,
} from "@/lib/types/request-validation/repository";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { RepositoryPaper } from "@/generated/prisma/client";

type PaperListItem = RepositoryPaper & {
  authors: Array<{
    user: {
      id: string;
      firstName: string | null;
      lastName: string | null;
    };
  }>;
  category: { id: string; name: string } | null;
  _count: {
    reviews: number;
    citationsReceived: number;
  };
};

export async function searchRepositoryPapers(
  payload: SearchRepositoryPapersSchema,
): Promise<ActionResponse<{ items: PaperListItem[]; nextCursor?: string }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = searchRepositoryPapersSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { query, categoryId, status, keywords, cursor, limit } =
    validatedPayload.data;

  try {
    const papers = await prisma.repositoryPaper.findMany({
      where: {
        ...(query && {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { abstract: { contains: query, mode: "insensitive" } },
          ],
        }),
        ...(categoryId && { categoryId }),
        ...(status && { status }),
        ...(keywords &&
          keywords.length > 0 && {
            keywords: {
              some: {
                keyword: { in: keywords },
              },
            },
          }),
      },
      include: {
        authors: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { order: "asc" },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            reviews: true,
            citationsReceived: true,
          },
        },
      },
      orderBy: [{ averageRating: "desc" }, { createdAt: "desc" }],
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    });

    const hasMore = papers.length > limit;
    const items = hasMore ? papers.slice(0, -1) : papers;
    const nextCursor = hasMore ? items[items.length - 1].id : undefined;

    return {
      success: true,
      message: "Papers fetched successfully",
      data: { items, nextCursor },
    };
  } catch (error) {
    console.error("Error searching papers", error);
    throw new Error("Database error");
  }
}
