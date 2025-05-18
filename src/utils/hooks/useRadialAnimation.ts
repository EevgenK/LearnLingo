import { useEffect, useState } from 'react';

type RadialPoint = { x: number; y: number; visible: boolean };

export const useRadialAnimation = (
  length: number,
  show: boolean,
  radius = 45,
  startAngle = 240,
  delay = 100,
): RadialPoint[] => {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    const timeouts = Array.from({ length }).map((_, i) => {
      const timeout = setTimeout(
        () => {
          setVisibleIndexes((prev) =>
            show ? [...prev, i] : prev.filter((index) => index !== i),
          );
        },
        show ? i * delay : (length - i - 1) * delay,
      );
      return timeout;
    });

    return () => timeouts.forEach(clearTimeout);
  }, [length, show, delay]);

  return Array.from({ length }).map((_, idx) => {
    const angle = startAngle - (180 / length) * idx;
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);
    return {
      x,
      y,
      visible: visibleIndexes.includes(idx),
    };
  });
};
