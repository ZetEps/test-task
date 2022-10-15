import React, {useEffect, useRef} from 'react'
import { Canv } from '../core/Canvas'
import style from "./Canvas.module.css"
const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const btn = useRef<HTMLButtonElement>(null)
    useEffect(()=>{
        
        const canvas = new Canv(canvasRef)
        btn.current?.addEventListener("click", ()=>{
          canvas.onCanvasClear()
        })
       const interval = setInterval(()=>{
            canvas.render(30)
        },300)


    },[])



  return (
    <>
      <canvas width={900} height={500} className = {'canvas'} ref = {canvasRef}></canvas>
      <button ref = {btn}>Collapse Lines</button>
    </>
  )
}

export default Canvas