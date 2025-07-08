import React, { useState, useRef, useCallback, useEffect } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface DraggableNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  className?: string;
  max?: number;
  min?: number;
}

function DraggableNumberInput({
  value,
  onChange,
  step = 1,
  className,
  min = -Infinity,
  max = Infinity,
}: DraggableNumberInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [virtualCursor, setVirtualCursor] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [startValue, setStartValue] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const clamp = useCallback(
    (val: number) => {
      return Math.min(Math.max(val, min), max);
    },
    [min, max]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;

      setStartValue(value);
      setIsDragging(true);
      setVirtualCursor({ x: e.clientX, y: e.clientY });

      if (inputRef.current) {
        inputRef.current.blur();
        inputRef.current.requestPointerLock?.();
      }
    },
    [value]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const newX = (virtualCursor.x + e.movementX + screenWidth) % screenWidth;
      const newY = Math.max(
        0,
        Math.min(screenHeight, virtualCursor.y + e.movementY)
      ); // optional vertical bounds

      setVirtualCursor({ x: newX, y: newY });

      // Apply delta to value
      const deltaValue = e.movementX * step * 0.05;
      const newValue = startValue + deltaValue;
      const clamped = clamp(newValue);

      onChange(Number.parseFloat(clamped.toFixed(6)));
      setStartValue(newValue); // Keep accumulating from last point
    },
    [isDragging, virtualCursor, startValue, step, clamp, onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.exitPointerLock?.();
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "none";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.body.style.cursor = "default";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.target.value) || 0;
    onChange(clamp(newValue));
  };

  return (
    <>
      <Input
        ref={inputRef}
        type="number"
        value={value}
        onChange={handleInputChange}
        onMouseDown={handleMouseDown}
        className={cn(
          "w-full px-2 py-1 text-xs border rounded bg-background text-foreground hover:bg-accent/50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          className,
          { "bg-accent": isDragging }
        )}
        step={step}
      />

      {isDragging && (
        <div
          style={{
            position: "fixed",
            top: virtualCursor.y,
            left: virtualCursor.x,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          <div className="w-6 h-6">
            <img
              src="/arrow-left-right.webp"
              alt="drag arrows"
              className="size-full object-contain"
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default DraggableNumberInput;
