import { isHTMLElement } from "../isHtmlElement";
import { Tool } from "./Tool";

export class Line extends Tool {
  startX: number = 0;
  startY: number = 0;
  saved: string = "";

  constructor(
    public canvas: HTMLCanvasElement,
    public socket: WebSocket,
    public sessionId: string,
  ) {
    super(canvas, socket, sessionId);
    this.setCursorStyle("crosshair");
  }

  mouseDownHandler(e: MouseEvent): void {
    super.mouseDownHandler(e);
    if (!isHTMLElement(e.target)) {
      return;
    }
    this.ctx.beginPath();
    const { x, y } = this.getMousePosition(e);
    this.ctx.moveTo(x, y);
    this.startX = x;
    this.startY = y;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e: MouseEvent): void {
    if (!this.mouseDown) {
      return;
    }
    if (!isHTMLElement(e.target)) {
      return;
    }
    const { x, y } = this.getMousePosition(e);
    this.draw(x, y);
  }

  draw(x: number, y: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.clearCanvas();
      this.ctx.drawImage(img, 0, 0);
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }
}
