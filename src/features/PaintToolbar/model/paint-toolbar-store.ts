import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Tool } from "../lib/tools/Tool";
import { castDraft } from "immer";

interface PaintToolbarState {
  tool: Tool | null;
  setTool: (newTool: Tool) => void;
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  setLineWidth: (lineWidth: number) => void;
}

export const usePaintToolbarStore = create<PaintToolbarState>()(
  devtools(
    immer((set) => ({
      tool: null,
      setTool: (newTool: Tool) =>
        set((state) => {
          state.tool = castDraft(newTool);
        }),
      setFillColor: (color: string) =>
        set((state) => {
          if (state.tool === null) {
            return;
          }
          state.tool.fillColor = castDraft(color);
        }),
      setStrokeColor: (color: string) =>
        set((state) => {
          if (state.tool === null) {
            return;
          }
          state.tool.strokeColor = castDraft(color);
        }),
      setLineWidth: (lineWidth: number) =>
        set((state) => {
          if (state.tool === null) {
            return;
          }
          state.tool.lineWidth = castDraft(lineWidth);
        }),
    })),
  ),
);
