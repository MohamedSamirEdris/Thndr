import { useEffect } from 'react';

export const useInfiniteScroll = (
  ref: React.RefObject<HTMLElement>,
  onIntersect: () => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, onIntersect, options]);
};
