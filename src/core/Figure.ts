import { nanoid } from "nanoid"

export  abstract class Figure{
    public id:string
    
    
    constructor(){
        this.id = nanoid()
    }


    abstract render(ctx:CanvasRenderingContext2D):void

}