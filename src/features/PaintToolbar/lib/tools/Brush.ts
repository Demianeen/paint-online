import { isHTMLElement } from "../isHtmlElement";
import { Tool } from "./Tool";

export class Brush extends Tool {
  constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
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
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
