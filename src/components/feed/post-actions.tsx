"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { togglePostReaction } from "@/actions/feed/reactions";
import { togglePostBookmark } from "@/actions/feed/bookmark";
import { ReactionType } from "@/lib/enums/feed";
import { useToast } from "@/hooks/use-toast";

interface PostActionsProps {
  postId: string;
  initialLiked: boolean;
  initialBookmarked: boolean;
  onReactionToggle?: (isLiked: boolean) => void;
  onBookmarkToggle?: (isBookmarked: boolean) => void;
  onCommentClick?: () => void;
}

export function PostActions({
  postId,
  initialLiked,
  initialBookmarked,
  onReactionToggle,
  onBookmarkToggle,
  onCommentClick,
}: PostActionsProps) {
  const { toast } = useToast();
  const [liked, setLiked] = useState(initialLiked);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [isReactionPending, startReactionTransition] = useTransition();
  const [isBookmarkPending, startBookmarkTransition] = useTransition();

  const handleReaction = (reactionType: ReactionType) => {
    const previousState = liked;

    // optimistic update
    setLiked(!liked);
    onReactionToggle?.(!liked);

    startReactionTransition(async () => {
      try {
        const response = await togglePostReaction({ postId, reactionType });

        if (!response.success) {
          // revert on failure
          setLiked(previousState);
          onReactionToggle?.(previousState);
          toast({
            variant: "destructive",
            title: "Error",
            description: response.message,
          });
        } else {
          setLiked(response.data?.isReacted || false);
          onReactionToggle?.(response.data?.isReacted || false);
        }
      } catch (error) {
        // revert on error
        setLiked(previousState);
        onReactionToggle?.(previousState);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update reaction",
        });
      }
    });
  };

  const handleBookmark = () => {
    const previousState = bookmarked;

    // optimistic update
    setBookmarked(!bookmarked);
    onBookmarkToggle?.(!bookmarked);

    startBookmarkTransition(async () => {
      try {
        const response = await togglePostBookmark({ postId });

        if (!response.success) {
          // revert on failure
          setBookmarked(previousState);
          onBookmarkToggle?.(previousState);
          toast({
            variant: "destructive",
            title: "Error",
            description: response.message,
          });
        } else {
          setBookmarked(response.data?.isBookmarked || false);
          onBookmarkToggle?.(response.data?.isBookmarked || false);
        }
      } catch (error) {
        // revert on error
        setBookmarked(previousState);
        onBookmarkToggle?.(previousState);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update bookmark",
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-between pt-2 -mx-2">
      <div className="flex items-center flex-1">
        {/* like button */}
        <Button
          variant="ghost"
          size="sm"
          disabled={isReactionPending}
          onClick={() => handleReaction(ReactionType.Like)}
          className="flex-1 h-9 text-xs font-normal text-muted-foreground hover:text-red-500 hover:bg-red-500/10 justify-center transition-colors group"
        >
          <Heart
            className={`w-4 h-4 transition-all group-hover:scale-110 ${
              liked ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>

        {/* comment button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onCommentClick}
          className="flex-1 h-9 text-xs font-normal text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 justify-center transition-colors group"
        >
          <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-all" />
        </Button>

        {/* share button */}
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 h-9 text-xs font-normal text-muted-foreground hover:text-green-500 hover:bg-green-500/10 justify-center transition-colors group"
        >
          <Share2 className="w-4 h-4 group-hover:scale-110 transition-all" />
        </Button>
      </div>

      {/* bookmark button */}
      <Button
        variant="ghost"
        size="sm"
        disabled={isBookmarkPending}
        onClick={handleBookmark}
        className="h-9 text-xs font-normal text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10 px-3 transition-colors group"
      >
        <Bookmark
          className={`w-4 h-4 transition-all group-hover:scale-110 ${
            bookmarked ? "fill-yellow-500 text-yellow-500" : ""
          }`}
        />
      </Button>
    </div>
  );
}
