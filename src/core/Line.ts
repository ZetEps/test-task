import { Figure } from "./Figure"

export interface Coord{
    x:number | null,
    y:number | null
}


export class Line extends Figure{

    private from:Coord
    private to:Coord

    constructor(){
        super()
        this.from = {x:null, y:null}
        this.to = {x:null, y:null}
    }

    public render = (ctx:CanvasRenderingContext2D)=>{
        if(this.from.x && this.from.y && this.to.x && this.to.y){

            ctx.fillStyle = "#000"
            ctx.moveTo(this.from.x, this.from.y);
            ctx.lineTo(this.to.x, this.to.y);
            ctx.fill()
            
        }
        
    }

    public setFromPoint = (coord:Coord)=>{
        this.from = coord
        return this
    }

    public setToPoint = (coord:Coord)=>{
        this.to = coord
        return this
    }

    public intersection = (from:Coord, to:Coord)=>{
        
        if(this.from?.x && this.to?.x && this.from?.y && this.to?.y && from.x && from.y && to.x && to.y){

            const c2x = from.x - to.x
            let c3x = this.from.x - this.to.x

            let c3y = this.from.y - this.to.y
            const c2y = from.y - to.y

            const d = c3x * c2y - c3y * c2x;

            // if(d === 0 ) console.log("Error")

            const u1 = this.from.x * this.to.y - this.from.y * this.to.x
            const u4 = from.x * to.y - from.y * to.x 


            const px = (u1 * c2x - c3x * u4) / d
            const py = (u1 * c2y - c3y * u4) / d

            return {x:px, y:py}
        }
        

    }

    public getCoord = ()=>{
        return {from:this.from, to:this.to}
    }


    public collapse = ()=>{
        if(this.from.x && this.from.y && this.to.x && this.to.y){
            let center = {x:(this.from.x + this.to.x)/2, y:(this.from.y + this.to.y)/2}

            const fx = (center.x - this.from.x)/30
            const fy = (center.y - this.from.y)/30

            const tx = (center.x - this.to.x)/30
            const ty = (center.y - this.to.y)/30

            setInterval(()=>{
                if(this.from.x && this.from.y && this.to.x && this.to.y){
                    
                    this.from.x = this.from.x + fx
                    this.from.y = this.from.y + fy

                    this.to.x = this.to.x + tx
                    this.to.y = this.to.y + ty

                }
            }, 100)

        }
        
    }

    
}
