import { Line } from "../Elements/Line";
import { getCursorPosition } from "../utils";
import { Core } from "./Core";

export class Events extends Core{
    constructor(canvas: React.RefObject<HTMLCanvasElement>){
        super(canvas)
        this.canvas.onclick = this.onClick;
    }

    private onClick = (e: MouseEvent) => {
        if (e.button === 0) {
          this.canvas.onclick = null;
          const coordX = getCursorPosition(e, this.canvas);
          const line = new Line().setFromPoint({ x: coordX.x, y: coordX.y });
          this.state.push(line);
          this.canvas.onmousemove = (e: MouseEvent) => {
            const coordY = getCursorPosition(e, this.canvas);
            line.setToPoint({ x: coordY.x, y: coordY.y });
    
            this.canvas.onclick = (e) => {
              line.setToPoint({ x: coordY.x, y: coordY.y });
              line.state = "active";
              
              this.canvas.onclick = null;
              this.canvas.onmousemove = null;
              this.canvas.oncontextmenu = null;
              this.canvas.onclick = this.onClick;
            };
          };
    
          this.canvas.oncontextmenu = (e) => {
            e.preventDefault();
            this.state.delete(line.id, "line");
    
            this.canvas.onclick = null;
            this.canvas.onmousemove = null;
            this.canvas.oncontextmenu = null;
            this.canvas.onclick = this.onClick
          };
        }
      };
}