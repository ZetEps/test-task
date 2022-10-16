import { isIntersect } from "../utils";
import { Core } from "./Core";
import { Point } from "./Point";
import { Line } from "./Line";

export class Canv extends Core{

    private canvas:HTMLCanvasElement ;
    private ctx:CanvasRenderingContext2D

    private lines:Line[]
    private dots:Point[]
    
    constructor(canvas:React.RefObject<HTMLCanvasElement>){
        super()
        if(canvas.current){
            this.canvas = canvas.current      
            this.canvas.width = window.innerWidth > 1000 ? 1000 : window.innerWidth - 100 
            this.canvas.height =  600
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

        this.canvas.onclick = this.onMouseDown

    }


    


    private findIntersection = ()=>{

        this.dots = []

        if(this.lines.length > 1 && this.status === "active"){
            for(let i = 0; i <= this.lines.length; i++){
                for(let j = i + 1; j < this.lines.length; j++ ){
                    
                    const result = this.lines[i].intersection(this.lines[j].getCoord().from, this.lines[j].getCoord().to)
                    const cond = isIntersect(this.lines[i].getCoord().from, this.lines[i].getCoord().to, this.lines[j].getCoord().from, this.lines[j].getCoord().to)
                   
                    
                    if(result && cond){
                        this.dots.push(new Point(result))
                    }
                    
                }
            }
        }
        
    }


    

    private onMouseDown = (e:MouseEvent)=>{
        
       if(e.button === 0){
            this.canvas.onmousedown = null
            const coordX = this.getCursorPosition(e, this.canvas)
            const line = new Line().setFromPoint({x:coordX.x, y:coordX.y})
            this.lines.push(line)
            
            
            this.canvas.onmousemove = (e:MouseEvent)=>{

                const coordY = this.getCursorPosition(e, this.canvas)
                line.setToPoint({x:coordY.x, y:coordY.y})


                this.canvas.onclick = (e)=>{
                    const coordY = this.getCursorPosition(e, this.canvas)
                    line.setToPoint({x:coordY.x, y:coordY.y})
                    if(this.status === "collapsing"){
                        setInterval(()=>{
                            line.state = "active"
                        }, 3000)
                    }else{
                        line.state = "active"
                    }
                    this.canvas.onclick = null
                    this.canvas.onmousemove = null
                    this.canvas.oncontextmenu = null
                    
                    this.canvas.addEventListener("click", this.onMouseDown)
                    

                }
                
            }

            

            
            this.canvas.oncontextmenu = (e)=>{

                e.preventDefault()
                this.lines = this.lines.filter((element)=>{

                    if(element.id === line.id) return false
                    else return true

                }) 
                this.canvas.onclick = null
                    this.canvas.onmousemove = null
                    this.canvas.oncontextmenu = null
                    this.canvas.addEventListener("mousedown", this.onMouseDown)

            }
       }

       
    }
    

    public render = ()=>{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 1

        this.lines.forEach((line)=>{
            line.render(this.ctx)
        })

        this.dots.forEach((dot)=>{
            dot.render(this.ctx)
        })
        
        this.findIntersection()
    }

    

   


    public onCanvasClear = ()=>{
        this.lines.forEach((line)=>{
            if(line.state === "active"){
                line.collapse()
            }
        })

        setTimeout(()=>{
          this.lines = this.lines.filter((line)=>{
                if(line.state === "colapsed") return false
                else return true
            })
        }, 3000)
    }
    


    


    
}