import { castDraft } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface PaintCanvasState {
  canvas: HTMLCanvasElement | null;
  undoList: string[];
  redoList: string[];
  username: string;
  socketId: string;
  socket: WebSocket;
  setCanvas: (newCanvas: HTMLCanvasElement) => void;
  setUsername: (newUsername: string) => void;
  setSocketId: (newSocketId: string) => void;
  setSocket: (newSocket: WebSocket) => void;
  pushToUndo: (canvasState: string) => void;
  pushToRedo: (canvasState: string) => void;
  undo: () => void;
  redo: () => void;
}

// TODO: Move undo/redo to separate state
// TODO: Check momento pattern
export const usePaintCanvasStore = create<PaintCanvasState>()(
  devtools(
    immer((set) => ({
      canvas: null,
      undoList: [],
      redoList: [],
      username: "",
      socketId: "",
      socket: "",
      setCanvas: (newCanvas) => {
        set((state) => {
          state.canvas = castDraft(newCanvas);
        });
      },
      // TODO: Maybe do something like set initial values
      setUsername: (newUsername) => {
        set((state) => {
          state.username = newUsername;
        });
      },
      setSocketId: (newSocketId) => {
        set((state) => {
          state.socketId = newSocketId;
        });
      },
      setSocket: (newSocket) => {
        set((state) => {
          state.socket = newSocket;
        });
      },
      pushToUndo: (canvasState) => {
        set((state) => {
          state.undoList.push(canvasState);
        });
      },
      pushToRedo: (canvasState) => {
        set((state) => {
          state.redoList.push(canvasState);
        });
      },
      undo: () => {
        set((state) => {
          const dataUrl = state.undoList.pop();
          const canvas = state.canvas;
          if (dataUrl === undefined || canvas === null) {
            alert("You have no actions to undo");
            return;
          }
          const ctx = canvas.getContext("2d");
          if (ctx == null) {
            return;
          }
          state.redoList.push(canvas.toDataURL());

          const img = new Image();
          img.src = dataUrl;
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
          };
        });
      },
      redo: () => {
        set((state) => {
          const dataUrl = state.redoList.pop();
          const canvas = state.canvas;
          if (dataUrl == undefined || canvas == null) {
            alert("You have no actions to redo");
            return;
          }
          const ctx = canvas.getContext("2d");
          if (ctx == null) {
            return;
          }
          state.undoList.push(canvas.toDataURL());

          const img = new Image();
          img.src = dataUrl;
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
          };
        });
      },
    })),
  ),
);
