import { nanoid } from "nanoid";

export class Figure {
  public id: string;
  public type: string;

  constructor(type: string) {
    this.id = nanoid();
    this.type = type;
  }

  render(ctx: CanvasRenderingContext2D) {
    throw new Error("Render should be implemented");
  }
}
