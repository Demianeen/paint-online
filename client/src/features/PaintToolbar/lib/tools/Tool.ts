import { isHTMLElement } from "../isHtmlElement";

export abstract class Tool {
  public ctx: CanvasRenderingContext2D;
  public mouseDown = false;

  constructor(
    public canvas: HTMLCanvasElement,
    public socket: WebSocket,
    public sessionId: string,
  ) {
    const canvasContext = canvas.getContext("2d");
    if (canvasContext === null) {
      throw new Error("Canvas context is null");
    }
    this.ctx = canvasContext;
    // if the tool subclass does not implement
    this.setCursorStyle("default");

    // bind new events after removal of old ones
    this.destroyEvents();
    this.listen();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected mouseUpHandler(_: MouseEvent): void {
    this.mouseDown = false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected mouseDownHandler(_: MouseEvent): void {
    this.mouseDown = true;
  }
  abstract mouseMoveHandler(e: MouseEvent): void;

  protected getMousePosition(e: MouseEvent) {
    if (!isHTMLElement(e.target)) {
      throw new Error("e.target is not an html element!");
    }
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    return { x, y };
  }

  protected listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  protected destroyEvents() {
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
  }

  public clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  protected setCursorStyle(cursor: string) {
    this.canvas.style.cursor = cursor;
  }

  set fillColor(color: string) {
    this.ctx.fillStyle = color;
  }

  get strokeColor() {
    return String(this.ctx.strokeStyle);
  }

  set strokeColor(color: string) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width: number) {
    this.ctx.lineWidth = width;
  }
}
