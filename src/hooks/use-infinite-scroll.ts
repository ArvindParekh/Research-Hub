import { useEffect, useRef, useCallback } from "react";

export function useInfiniteScroll(
  onLoadMore: () => void,
  options: {
    hasMore: boolean;
    isLoading: boolean;
    threshold?: number;
  },
) {
  const { hasMore, isLoading, threshold = 300 } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore],
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    // create observer
    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0,
      rootMargin: `${threshold}px`,
    });

    observerRef.current.observe(element);

    // cleanup
    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [handleObserver, threshold]);

  return loadMoreRef;
}
