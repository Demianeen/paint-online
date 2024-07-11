import { useEffect, useRef } from "react";
import { usePaintCanvasStore } from "../../model/paint-canvas-store";

export interface PaintCanvasProps {}

export const PaintCanvas = ({}: PaintCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setCanvas = usePaintCanvasStore((state) => state.setCanvas);
  const pushToUndo = usePaintCanvasStore((state) => state.pushToUndo);

  useEffect(() => {
    if (canvasRef.current !== null) {
      setCanvas(canvasRef.current);
    } else {
      console.error("canvasRef is undefined");
    }
  }, [pushToUndo, setCanvas]);

  return (
    <div className="h-full flex justify-center items-center">
      <canvas
        width={600}
        height={400}
        ref={canvasRef}
        onMouseDown={() => {
          const dataUrl = canvasRef.current?.toDataURL();
          if (dataUrl === undefined) {
            return;
          }
          pushToUndo(dataUrl);
        }}
        className="border-gray border-2 bg-white"
      />
    </div>
  );
};
