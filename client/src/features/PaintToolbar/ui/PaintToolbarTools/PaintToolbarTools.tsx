import { IconButton } from "@/shared/ui/IconButton/IconButton";
import { Toolbar } from "@/shared/ui/Toolbar";
import { FaEraser } from "react-icons/fa6";
import {
  MdBrush,
  MdRectangle,
  MdCircle,
  MdUndo,
  MdRedo,
  MdSave,
  MdClear,
} from "react-icons/md";
import LineIcon from "../../../../shared/assets/icons/line.svg?react";
import { usePaintToolbarStore } from "../../model/paint-toolbar-store";
import { useEffect } from "react";
import { usePaintCanvasStore } from "@/entities/PaintCanvas/model/paint-canvas-store";
import { Brush } from "../../lib/tools/Brush";
import { Circle } from "../../lib/tools/Circle";
import clsx from "clsx";
import { Eraser } from "../../lib/tools/Eraser";
import { Rectangle } from "../../lib/tools/Rectangle";
import { Line } from "../../lib/tools/Line";

export interface PaintToolbarToolsProps {
  className?: string;
}

// otherwise inherited tools from other tools would be considered the same (like Brush -> Eraser)
function isDirectInstanceOf<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  className: any,
): object is T {
  return object?.constructor === className;
}

export const PaintToolbarTools = ({ className }: PaintToolbarToolsProps) => {
  const canvas = usePaintCanvasStore((state) => state.canvas);
  const socketId = usePaintCanvasStore((state) => state.socketId);
  const socket = usePaintCanvasStore((state) => state.socket);
  const undo = usePaintCanvasStore((state) => state.undo);
  const redo = usePaintCanvasStore((state) => state.redo);
  const setTool = usePaintToolbarStore((state) => state.setTool);
  const tool = usePaintToolbarStore((state) => state.tool);

  useEffect(() => {
    if (canvas !== null) {
      setTool(new Brush(canvas, socket, socketId));
    }
  }, [canvas, setTool, socket, socketId]);

  if (canvas === null) {
    return <></>;
  }
  const activeClassname = "ring";

  function handleDownload(
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    if (canvas == null) {
      return;
    }
    const dataUrl = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = socketId + ".png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <Toolbar className={clsx("flex justify-between", className)}>
      <div className="flex items-center gap-2">
        <IconButton
          title="brush"
          Svg={MdBrush}
          onClick={() => setTool(new Brush(canvas, socket, socketId))}
          className={clsx(isDirectInstanceOf(tool, Brush) && activeClassname)}
        />
        <IconButton
          title="rectangle"
          Svg={MdRectangle}
          onClick={() => setTool(new Rectangle(canvas, socket, socketId))}
          className={clsx(
            isDirectInstanceOf(tool, Rectangle) && activeClassname,
          )}
        />
        <IconButton
          title="circle"
          Svg={MdCircle}
          onClick={() => setTool(new Circle(canvas, socket, socketId))}
          className={clsx(isDirectInstanceOf(tool, Circle) && activeClassname)}
        />
        <IconButton
          title="eraser"
          Svg={FaEraser}
          onClick={() => setTool(new Eraser(canvas, socket, socketId))}
          className={clsx(isDirectInstanceOf(tool, Eraser) && activeClassname)}
        />
        <IconButton
          title="line"
          Svg={LineIcon}
          onClick={() => setTool(new Line(canvas, socket, socketId))}
          className={clsx(isDirectInstanceOf(tool, Line) && activeClassname)}
        />
      </div>
      <div className="flex items-center gap-2">
        <IconButton title="undo" Svg={MdUndo} onClick={undo} />
        <IconButton title="redo" Svg={MdRedo} onClick={redo} />
        <IconButton title="download" Svg={MdSave} onClick={handleDownload} />
        <IconButton
          title="clear"
          Svg={MdClear}
          onClick={() => tool?.clearCanvas()}
        />
      </div>
    </Toolbar>
  );
};
