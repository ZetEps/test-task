export abstract class Core{

    public status:"active" | "collapsing"

    constructor(){
        this.status = "active"
    }

    public getCursorPosition = (event:MouseEvent, canvas:HTMLCanvasElement)=>{

        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY  - rect.top
        return {x:x, y:y}
        
    }
}