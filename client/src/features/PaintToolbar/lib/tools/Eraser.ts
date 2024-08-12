import { Brush } from "./Brush";

export class Eraser extends Brush {
  draw(x: number, y: number): void {
    const prevColor = this.strokeColor;
    this.strokeColor = "white";
    super.draw(x, y);
    this.strokeColor = prevColor;
  }
}
