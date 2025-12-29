import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver = <T extends Record<string, boolean>>(
  initialState: T,
  { threshold = 0.1, rootMargin = '0px 0px -50px 0px' }: UseIntersectionObserverProps = {}
) => {
  const [isVisible, setIsVisible] = useState<T>(() => {
    // Initialize all sections as visible to prevent content hiding
    const visibleState = {} as T;
    Object.keys(initialState).forEach(key => {
      visibleState[key as keyof T] = true as T[keyof T];
    });
    return visibleState;
  });
  
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const setRef = (key: string) => (element: HTMLElement | null) => {
    refs.current[key] = element;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const sectionName = target.dataset.section;
          
          if (sectionName && entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [sectionName]: true
            } as T));
          }
        });
      },
      { threshold, rootMargin }
    );

    Object.values(refs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(refs.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [threshold, rootMargin]);

  return { isVisible, setRef };
};