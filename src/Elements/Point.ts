import { Figure } from "./Figure";
import { Coord } from "./Line";

export class Point extends Figure {
  private coord: Coord;
  private size: number;

  constructor(coords: Coord, size: number = 5, height: number = 5) {
    super("point");
    this.coord = coords;
    this.size = size;
  }

  public render = (ctx: CanvasRenderingContext2D) => {
    if (this.coord.x && this.coord.y) {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc(this.coord.x, this.coord.y, this.size, 0, 2 * Math.PI, true);
      ctx.fill();
    }
  };
}
