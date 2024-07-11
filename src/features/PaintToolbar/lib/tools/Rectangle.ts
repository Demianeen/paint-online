import { isHTMLElement } from "../isHtmlElement";
import { Tool } from "./Tool";

export class Rectangle extends Tool {
  startX: number = 0;
  startY: number = 0;
  saved: string = "";

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

    this.draw(
      this.startX,
      this.startY,
      Math.abs(this.startX - x),
      Math.abs(this.startY - y),
    );
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
}
