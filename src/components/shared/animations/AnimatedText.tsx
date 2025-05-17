import React, { useRef } from 'react';
import type { JSX, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import s from './AnimatedText.module.css';
type AnimatedTextProps = {
  as?: keyof JSX.IntrinsicElements; // наприклад: "h1", "p", "span"
  text: ReactNode;
  duration?: number;
  delay?: number;
  wordDelay?: number;
  className?: string;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  as: Tag = 'p',
  text,
  duration = 1,
  wordDelay = 0.1,
  className,
}) => {
  const textRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.' + s.animated_word);
      if (!words) return;

      gsap.fromTo(
        words,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration,
          stagger: wordDelay,
          ease: 'power2.out',
        },
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  const wrapWords = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      return node.split(' ').map((word, i) => (
        <span key={i} className={s.animated_word}>
          {word}&nbsp;
        </span>
      ));
    }

    if (
      React.isValidElement(node) &&
      (node.props as { children?: ReactNode })?.children
    ) {
      return React.cloneElement(
        node,
        undefined,
        wrapWords((node.props as { children?: ReactNode }).children),
      );
    }

    if (Array.isArray(node)) {
      return node.map((child, i) => (
        <React.Fragment key={i}>{wrapWords(child)}</React.Fragment>
      ));
    }

    return node;
  };

  return React.createElement(Tag, { ref: textRef, className }, wrapWords(text));
};
