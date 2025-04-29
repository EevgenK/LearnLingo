import { RefObject } from 'react';
export const smoothScroll = (element: RefObject<HTMLUListElement | null>) => {
  if (element && element.current) {
    const firstCard = element.current.firstElementChild as HTMLElement | null;
    const cardHeight = firstCard?.getBoundingClientRect().height || 0;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
};
