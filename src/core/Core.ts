import { State } from "./State";


export class Core {
  public status: "active" | "collapsing";
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public state: State;

  constructor(canvas: React.RefObject<HTMLCanvasElement>) {
    if (canvas.current) {
      this.canvas = canvas.current;
      this.canvas.width =
        window.innerWidth > 1000 ? 1000 : window.innerWidth - 100;
      this.canvas.height = 600;
    } else {
      throw new Error("Canvas.current shouldn't be null or undifiend");
    }

    const context = this.canvas.getContext("2d");

    if (context) {
      this.ctx = context;
    } else {
      throw new Error("Context shouldn't be null");
    }

    this.state = new State();
    this.status = "active";
  }
}
