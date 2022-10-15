import { Coord } from "./Line"

export class Dot{

    private dot:Coord
    
    constructor(coords:Coord){
        this.dot = coords
    }


    public render = (ctx:CanvasRenderingContext2D)=>{
        if(this.dot.x && this.dot.y){
            
            ctx.fillRect(this.dot.x,this.dot.y,3,3);
            ctx.fillStyle = "red"
            ctx.fill()
        }
    }
}