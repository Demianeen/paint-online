import { isHTMLElement } from "../isHtmlElement";
import { Tool } from "./Tool";

export class Circle extends Tool {
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
    const middleX = this.startX + (x - this.startX) / 2;
    const middleY = this.startY + (y - this.startY) / 2;

    const radiusX = Math.abs((this.startX - x) / 2);
    const radiusY = Math.abs((this.startY - y) / 2);
    this.draw(middleX, middleY, Math.max(radiusX, radiusY));
  }

  draw(x: number, y: number, radius: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.clearCanvas();
      this.ctx.drawImage(img, 0, 0);
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }
}
