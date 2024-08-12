import { isHTMLElement } from "../isHtmlElement";
import { Tool } from "./Tool";

export interface BrushFigure {
  type: "brush";
  x: number;
  y: number;
}

export class Brush extends Tool {
  constructor(
    public canvas: HTMLCanvasElement,
    public socket: WebSocket,
    public sessionId: string,
  ) {
    super(canvas, socket, sessionId);
    this.setCursorStyle("crosshair");
  }

  protected mouseUpHandler(_: MouseEvent): void {
    super.mouseUpHandler(_);
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.sessionId,
        figure: {
          type: "finish",
        },
      }),
    );
  }

  mouseDownHandler(e: MouseEvent): void {
    super.mouseDownHandler(e);
    if (!isHTMLElement(e.target)) {
      return;
    }
    this.ctx.beginPath();
    const { x, y } = this.getMousePosition(e);
    this.ctx.moveTo(x, y);
  }

  mouseMoveHandler(e: MouseEvent): void {
    if (!this.mouseDown) {
      return;
    }
    if (!isHTMLElement(e.target)) {
      return;
    }
    const { x, y } = this.getMousePosition(e);
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.sessionId,
        figure: {
          type: "brush",
          x,
          y,
        },
      }),
    );
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
