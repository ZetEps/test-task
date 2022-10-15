import { nanoid } from "nanoid"

export interface Coord{
    x:number | null,
    y:number | null
}


export class Line{

    private from:Coord
    private to:Coord
    public id:string
    private isDraw:boolean

    constructor(){
        this.from = {x:null, y:null}
        this.to = {x:null, y:null}
        this.id = nanoid()
        this.isDraw = false
    }

    public render = (ctx:CanvasRenderingContext2D)=>{
        if(this.from.x && this.from.y && this.to.x && this.to.y){
            ctx.moveTo(this.from.x, this.from.y);
            ctx.lineTo(this.to.x, this.to.y);
            ctx.fillStyle = "#000"
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

            if(d === 0 ) throw new Error("Number of intersection points is zero or infinity.")

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
            const center = {x:(this.from.x + this.to.x)/2, y:(this.from.y + this.to.y)/2}
            setInterval(()=>{
                if(this.from.x && this.from.y && this.to.x && this.to.y){
                    this.from.x = (this.from.x + center.x) / 2
                    this.from.y = (this.from.y + center.y) / 2

                    this.to.x = (this.to.x + center.x) / 2
                    this.to.y = (this.to.y + center.y) / 2


                    
                }
            }, 150)
        }
        
    }

    
}
