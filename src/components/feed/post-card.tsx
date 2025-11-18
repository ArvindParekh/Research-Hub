"use client";

import { useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { PostActions } from "./post-actions";
import { PostMenu } from "./post-menu";
import type { PostWithDetails } from "@/lib/types/feed";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: PostWithDetails;
  currentUserId?: string;
  onDelete?: (postId: string) => void;
}

export function PostCard({ post, currentUserId, onDelete }: PostCardProps) {
  const [reactionCount, setReactionCount] = useState(post._count.reactions);
  const [commentCount] = useState(post._count.comments);
  const [bookmarkCount, setBookmarkCount] = useState(post._count.bookmarks);

  // memoized values
  const authorName = useMemo(() => {
    return post.author.firstName && post.author.lastName
      ? `${post.author.firstName} ${post.author.lastName}`
      : post.author.firstName || "Unknown User";
  }, [post.author]);

  const authorInitials = useMemo(() => {
    if (post.author.firstName) {
      return post.author.firstName.charAt(0).toUpperCase();
    }
    return "U";
  }, [post.author]);

  const timeAgo = useMemo(() => {
    try {
      return formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
      });
    } catch {
      return "Unknown";
    }
  }, [post.createdAt]);

  const isOwnPost = currentUserId === post.authorId;

  // check if user has reacted
  const hasUserReacted = post.isLikedByUser ?? false;
  const hasUserBookmarked = post.isBookmarkedByUser ?? false;

  const handleReactionToggle = (isLiked: boolean) => {
    setReactionCount((prev) => (isLiked ? prev + 1 : prev - 1));
  };

  const handleBookmarkToggle = (isBookmarked: boolean) => {
    setBookmarkCount((prev) => (isBookmarked ? prev + 1 : prev - 1));
  };

  const handleDelete = () => {
    onDelete?.(post.id);
  };

  // get first attachment image if exists
  const imageAttachment = post.attachments?.find((att) => att.type === "Image");

  return (
    <article className="border-b border-border bg-background transition-colors duration-150 hover:bg-card/30">
      <div className="px-6 py-5 space-y-4">
        {/* post header */}
        <div className="flex gap-4">
          <Link href={`/profile/${post.authorId}`} className="shrink-0">
            <Avatar className="w-12 h-12 border border-border/30 hover:ring-2 ring-primary/30 transition-all">
              <AvatarImage src={undefined} alt={authorName} />
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/profile/${post.authorId}`}
                className="flex-1 min-w-0"
              >
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className="font-600 text-foreground text-sm leading-tight hover:text-primary transition-colors">
                    {authorName}
                  </h3>
                  {post.author.firstName && (
                    <p className="text-xs text-muted-foreground font-normal truncate">
                      Researcher
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {timeAgo}
                  {post.isEdited && " (edited)"}
                </p>
              </Link>
              <PostMenu
                postId={post.id}
                isOwnPost={isOwnPost}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>

        {/* post content */}
        <div className="space-y-4">
          {post.content && (
            <p className="text-sm leading-relaxed text-foreground text-pretty whitespace-pre-wrap">
              {post.content}
            </p>
          )}

          {/* image attachment */}
          {imageAttachment && (
            <div className="relative w-full overflow-hidden rounded-lg bg-muted/50 border border-border/50">
              <Image
                src={imageAttachment.url}
                alt="Post content"
                width={560}
                height={320}
                className="w-full object-cover max-h-96"
              />
            </div>
          )}
        </div>

        {/* engagement stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/30">
          <div className="flex gap-6">
            {reactionCount > 0 && (
              <span className="hover:text-foreground cursor-pointer transition-colors">
                {reactionCount} {reactionCount === 1 ? "like" : "likes"}
              </span>
            )}
            {commentCount > 0 && (
              <span className="hover:text-foreground cursor-pointer transition-colors">
                {commentCount} {commentCount === 1 ? "comment" : "comments"}
              </span>
            )}
            {bookmarkCount > 0 && (
              <span className="hover:text-foreground cursor-pointer transition-colors">
                {bookmarkCount} {bookmarkCount === 1 ? "save" : "saves"}
              </span>
            )}
          </div>
        </div>

        {/* actions */}
        <PostActions
          postId={post.id}
          initialLiked={hasUserReacted}
          initialBookmarked={hasUserBookmarked}
          onReactionToggle={handleReactionToggle}
          onBookmarkToggle={handleBookmarkToggle}
          onCommentClick={() => {
            // TODO: Implement comment modal/section
            console.log("Comment clicked");
          }}
        />
      </div>
    </article>
  );
}
