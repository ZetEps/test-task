import { Figure } from "./Figure";
import { Coord } from "./Line"

export class Point extends Figure{

    private coord:Coord
    private width:number
    private height:number

    constructor(coords:Coord, width:number = 5, height:number = 5){
        super()
        this.coord = coords
        this.width = width
        this.height = height
    }


    public render = (ctx:CanvasRenderingContext2D)=>{
        if(this.coord.x && this.coord.y){
            ctx.beginPath()
            ctx.fillStyle = "red"
            ctx.arc(this.coord.x, this.coord.y, 5, 0, 2 * Math.PI, true);
            ctx.fill()
            
        }
    }
}