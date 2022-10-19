import { Line } from "../Elements/Line";
import { Point } from "../Elements/Point";
import { Features } from "../Features/Features";
import { Events } from "./Events";

export class Canv extends Events {
  
  public onCanvasClear = () => {
    

    this.state.get("line").forEach((line: Line) => {
      if (line.state === "active") {
        line.collapse();
      }
    });

    setTimeout(() => {
      const lines = this.state.get("line").filter((line: Line) => {
        if (line.state === "colapsed") return false;
        else return true;
      });
      this.state.update("line", lines);
    }, 3000);
  };



  public render = () => {
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.state.getAll().forEach((state) => {
      if(state){
        state.render(this.ctx);
      }
    });
    this.state.clear("point")
    Features.findIntersection(this.state.get("line"), (result:{x:number, y:number})=>{
      this.state.push(new Point(result))
    })
    
  };


}
