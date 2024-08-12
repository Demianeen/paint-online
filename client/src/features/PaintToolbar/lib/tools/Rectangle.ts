import { isHTMLElement } from "../isHtmlElement";
import { Tool } from "./Tool";

export interface RectangleFigure {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Rectangle extends Tool {
  startX = 0;
  startY = 0;
  width = 0;
  height = 0;
  saved: string = "";

  protected mouseUpHandler(_: MouseEvent): void {
    super.mouseUpHandler(_);
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.sessionId,
        figure: {
          type: "rectangle",
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
        } satisfies RectangleFigure,
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
    this.width = Math.abs(this.startX - x);
    this.height = Math.abs(this.startY - y);

    this.draw(this.startX, this.startY, this.width, this.height);
  }

  draw(x: number, y: number, width: number, height: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.clearCanvas();
      this.ctx.drawImage(img, 0, 0);
      this.ctx.beginPath();
      this.ctx.rect(x, y, width, height);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static staticDraw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();
    ctx.stroke();
  }
}
