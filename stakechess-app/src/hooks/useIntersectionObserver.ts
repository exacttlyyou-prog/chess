import { useEffect, useState, useRef } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Хук для отслеживания видимости элемента
 * Использует Intersection Observer API
 * Полезно для lazy loading, infinite scroll, аналитики
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLElement | null>, boolean] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options;

  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Если уже виден и freezeOnceVisible = true, не наблюдаем
    if (freezeOnceVisible && isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isVisible]);

  return [elementRef, isVisible];
}

/**
 * Хук для infinite scroll
 */
export function useInfiniteScroll(
  onLoadMore: () => void,
  options: { threshold?: number; rootMargin?: string } = {}
) {
  const { threshold = 0.1, rootMargin = '100px' } = options;
  const [sentryRef, isVisible] = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (isVisible) {
      onLoadMore();
    }
  }, [isVisible, onLoadMore]);

  return sentryRef;
}
