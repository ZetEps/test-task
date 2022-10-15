import { Core } from "./Core";
import { Dot } from "./Dots";
import { Line } from "./Line";

export class Canv extends Core{

    private canvas:HTMLCanvasElement ;
    private ctx:CanvasRenderingContext2D

    private lines:Line[]
    private dots:Dot[]
    
    constructor(canvas:React.RefObject<HTMLCanvasElement>){
        super()
        if(canvas.current){
            this.canvas = canvas.current
        }
        else{
            throw new Error("Root.current shouldn't be null or undifiend")
        }

        const context = this.canvas.getContext("2d")

        if(context){
            this.ctx = context
        }
        else{
            throw new Error("Context shouldn't be null")
        }
        
        this.lines = []
        this.dots = []

        this.canvas.onmousedown = this.onMouseDown

    }


    private draw = ()=>{
        this.ctx.beginPath()
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 1

        this.lines.forEach((line)=>{
            line.render(this.ctx)
        })

        this.dots.forEach((dot)=>{
            dot.render(this.ctx)
        })
        
        if(this.lines.length > 1 && this.status === "active"){
            this.findIntersection()
        }

        
        this.ctx.stroke()
    }


    public render = (ms:number)=>{
        const interval = setInterval(()=>{
            this.draw()
        },ms)

        return interval
    }


    

    private onMouseDown = (e:MouseEvent)=>{

        this.canvas.onmousedown = null
       if(e.button === 0){
            const coordX = this.getCursorPosition(e, this.canvas)
            const line = new Line().setFromPoint(coordX)
            this.lines.push(line)
            
            
            this.canvas.onmousemove = (e:MouseEvent)=>{

                const coordsY = this.getCursorPosition(e, this.canvas)
                line.setToPoint(coordsY)


                this.canvas.onclick = (e)=>{

                    const coordsY = this.getCursorPosition(e, this.canvas)
                    line.setToPoint(coordsY)
                    this.canvas.onmousemove = null
                    this.canvas.onclick = null
                    this.canvas.onmousedown = this.onMouseDown

                }
                
            }

            
            this.canvas.oncontextmenu = (e)=>{

                e.preventDefault()
                this.lines = this.lines.filter((element)=>{

                    if(element.id === line.id) return false
                    else return true

                }) 

            }
       }

       
    }

    private findIntersection = ()=>{
        this.dots = []
        
        for(let i = 0; i <= this.lines.length; i++){
            for(let j = i + 1; j < this.lines.length; j++ ){
                
                const result = this.lines[i].intersection(this.lines[j].getCoord().from, this.lines[j].getCoord().to)

                if(result){
                    this.dots.push(new Dot(result))
                }
                
            }
        }
    }

   


    public onCanvasClear = ()=>{
        this.status = "collapsing"
        this.dots = []
        this.lines.forEach((line)=>{
            line.collapse()
        })

        setTimeout(() => {
            this.lines = []
            this.status = "active"
        }, 1000);
    }
    


    


    
}