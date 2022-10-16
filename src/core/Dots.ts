import { Figure } from "./Figure";
import { Coord } from "./Line"

export class Dot extends Figure{

    private dot:Coord
    
    constructor(coords:Coord){
        super()
        this.dot = coords
    }


    public render = (ctx:CanvasRenderingContext2D)=>{
        if(this.dot.x && this.dot.y){
            ctx.fillStyle = "red"
            ctx.fillRect(this.dot.x,this.dot.y,5,5);
            
            ctx.fill()
        }
    }
}