import type {
   Post,
   PostReaction,
   PostComment,
   PostAttachment,
} from "@prisma/client";
import type { ReactionType } from "@/lib/enums/feed";

// enhanced post type with author info and engagement data
export interface PostWithDetails extends Post {
   author: {
      id: string;
      firstName: string | null;
      lastName: string | null;
   };
   reactions: { type: ReactionType }[];
   comments: { id: string }[];
   _count: {
      reactions: number;
      comments: number;
      bookmarks: number;
   };
   attachments?: PostAttachment[];
   isLikedByUser?: boolean;
   isBookmarkedByUser?: boolean;
}

// feed state type
export interface FeedState {
   posts: PostWithDetails[];
   isLoading: boolean;
   hasMore: boolean;
   error: string | null;
}

// comment with user details
export interface CommentWithAuthor extends PostComment {
   user: {
      id: string;
      firstName: string | null;
      lastName: string | null;
   };
}
