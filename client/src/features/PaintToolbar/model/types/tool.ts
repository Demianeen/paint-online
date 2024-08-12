import { BrushFigure } from "../../lib/tools/Brush";
import { RectangleFigure } from "../../lib/tools/Rectangle";

export interface FinishFigure {
  type: "finish";
}

export type ToolFigure = BrushFigure | RectangleFigure | FinishFigure;

export interface DrawMessage {
  method: "draw";
  id: number;
  figure: ToolFigure;
}

export interface ConnectionMessage {
  method: "connection";
  id: number;
  username: string;
}

export type Message = DrawMessage | ConnectionMessage;
