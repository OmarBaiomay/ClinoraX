"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useCallback, useRef, useState, type PointerEvent } from "react";

type MagneticButtonProps = ButtonProps & {
  strength?: number;
};

export function MagneticButton({
  strength = 0.35,
  children,
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      onPointerMove?.(event);
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      setOffset({ x: x * strength, y: y * strength });
    },
    [onPointerMove, reduced, strength],
  );

  const handleLeave = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      onPointerLeave?.(event);
      setOffset({ x: 0, y: 0 });
    },
    [onPointerLeave],
  );

  return (
    <Button
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...props}
      style={{
        ...props.style,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {children}
    </Button>
  );
}
