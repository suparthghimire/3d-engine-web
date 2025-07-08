// import React, { useState, useRef, useCallback } from "react";
// import { Input } from "./input";
// import { cn } from "@/lib/utils";

// interface DraggableNumberInputProps {
//   value: number;
//   onChange: (value: number) => void;
//   step?: number;
//   precision?: number;
//   className?: string;
// }

// function DraggableNumberInput({
//   value,
//   onChange,
//   step = 1,
//   className,
// }: DraggableNumberInputProps) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [startValue, setStartValue] = useState(0);
//   const [startX, setStartX] = useState(0);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleMouseDown = useCallback(
//     (e: React.MouseEvent) => {
//       if (e.button !== 0) return; // Only left mouse button
//       setStartValue(value);
//       setStartX(e.clientX);

//       const handleInitialMouseMove = (moveEvent: MouseEvent) => {
//         const deltaX = Math.abs(moveEvent.clientX - e.clientX);

//         // If mouse moved more than 5 pixels, start dragging
//         if (deltaX > 5) {
//           setIsDragging(true);
//           document.body.style.cursor = "ew-resize";

//           if (inputRef.current) {
//             inputRef.current.blur();
//           }

//           document.removeEventListener("mousemove", handleInitialMouseMove);
//           document.removeEventListener("mouseup", handleInitialMouseUp);
//         }
//       };

//       const handleInitialMouseUp = () => {
//         document.removeEventListener("mousemove", handleInitialMouseMove);
//         document.removeEventListener("mouseup", handleInitialMouseUp);
//       };

//       document.addEventListener("mousemove", handleInitialMouseMove);
//       document.addEventListener("mouseup", handleInitialMouseUp);
//     },
//     [value]
//   );

//   const handleMouseMove = useCallback(
//     (e: MouseEvent) => {
//       if (!isDragging) return;

//       let clientX = e.clientX;
//       const clientY = e.clientY;

//       document.body.style.cursor = "ew-resize";

//       if (e.clientX <= 0) {
//         const newX = window.innerWidth - 10;
//         // Update cursor position
//         const event = new MouseEvent("mousemove", {
//           clientX: newX,
//           clientY: clientY,
//           bubbles: true,
//         });

//         setStartX((prev) => prev - window.innerWidth);
//         clientX = newX;

//         document.dispatchEvent(event);
//       } else if (e.clientX >= window.innerWidth - 1) {
//         const newX = 10;
//         const event = new MouseEvent("mousemove", {
//           clientX: newX,
//           clientY: clientY,
//           bubbles: true,
//         });

//         setStartX((prev) => prev + window.innerWidth);
//         clientX = newX;

//         document.dispatchEvent(event);
//       }

//       const deltaX = clientX - startX;
//       const deltaValue = deltaX * step * 0.5; // Sensitivity factor
//       const newValue = startValue + deltaValue;

//       onChange(Number.parseFloat(newValue.toString()));
//     },
//     [isDragging, startX, startValue, step, onChange]
//   );

//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//     document.body.style.cursor = "default";
//   }, []);

//   // Attach global mouse events when dragging
//   React.useEffect(() => {
//     if (isDragging) {
//       document.addEventListener("mousemove", handleMouseMove);
//       document.addEventListener("mouseup", handleMouseUp);

//       return () => {
//         document.removeEventListener("mousemove", handleMouseMove);
//         document.removeEventListener("mouseup", handleMouseUp);
//       };
//     }
//   }, [isDragging, handleMouseMove, handleMouseUp]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = Number.parseFloat(e.target.value) || 0;
//     onChange(newValue);
//   };

//   return (
//     <Input
//       ref={inputRef}
//       type="number"
//       value={value}
//       onChange={handleInputChange}
//       onMouseDown={handleMouseDown}
//       className={cn(
//         "w-full px-2 py-1 text-xs border rounded bg-background text-foreground hover:bg-accent/50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
//         className,
//         { "bg-accent": isDragging }
//       )}
//       step={step}
//     />
//   );
// }

// export default DraggableNumberInput;
import React, { useState, useRef, useCallback, useEffect } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface DraggableNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  className?: string;
}

function DraggableNumberInput({
  value,
  onChange,
  step = 1,
  className,
}: DraggableNumberInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [virtualCursor, setVirtualCursor] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [startValue, setStartValue] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

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

      onChange(Number.parseFloat(newValue.toFixed(6)));
      setStartValue(newValue); // Keep accumulating from last point
    },
    [isDragging, virtualCursor, startValue, step, onChange]
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
    onChange(newValue);
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
