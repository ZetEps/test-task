import { Figure } from "./Figure";

export interface Coord {
  x: number | null;
  y: number | null;
}

export class Line extends Figure {
  private from: Coord;
  private to: Coord;
  public state: "active" | "draw" | "colapsed" | "colapsing";

  constructor() {
    super("line");
    this.from = { x: null, y: null };
    this.to = { x: null, y: null };
    this.state = "draw";
  }

  public render = (ctx: CanvasRenderingContext2D) => {
    if (this.from.x && this.from.y && this.to.x && this.to.y) {
      ctx.beginPath();
      ctx.moveTo(this.from.x, this.from.y);
      ctx.lineTo(this.to.x, this.to.y);
      ctx.stroke();
    }
  };

  public setFromPoint = (coord: Coord) => {
    this.from = coord;
    return this;
  };

  public setToPoint = (coord: Coord) => {
    this.to = coord;
    return this;
  };


  public getCoord = () => {
    return { from: this.from, to: this.to };
  };

  public collapse = () => {
    this.state = "colapsing";

    if (this.from.x && this.from.y && this.to.x && this.to.y) {
      let center = {
        x: (this.from.x + this.to.x) / 2,
        y: (this.from.y + this.to.y) / 2,
      };

      const fx = (center.x - this.from.x) / 75;
      const fy = (center.y - this.from.y) / 75;

      const tx = (center.x - this.to.x) / 75;
      const ty = (center.y - this.to.y) / 75;

      setInterval(() => {
        if (this.from.x && this.from.y && this.to.x && this.to.y) {
          this.from.x = this.from.x + fx;
          this.from.y = this.from.y + fy;

          this.to.x = this.to.x + tx;
          this.to.y = this.to.y + ty;
        }
      }, 40);

      setTimeout(() => {
        this.state = "colapsed";
      }, 3000);
    }
  };
}
