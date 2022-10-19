import React, {useEffect, useRef} from 'react'
import { Canv } from '../core/Canv'
import style from "./Canvas.module.css"

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const btn = useRef<HTMLButtonElement>(null)

    useEffect(()=>{
        
        const canvas = new Canv(canvasRef)

        btn.current?.addEventListener("click", ()=>{
          canvas.onCanvasClear()
        })

        let animation:number

       const render = ()=>{
          canvas.render()
          animation = window.requestAnimationFrame(render)
       }
       
       render()


       return ()=>{window.cancelAnimationFrame(animation)}
    },[])


    

  return (
    <>
      {canvasRef 
      ?
      <div className={style.container}>
        <canvas  className = {style.canvas} ref = {canvasRef}></canvas>
        <button ref = {btn} className = {style.btn}>Collapse Lines</button>
      </div> 
      : <div></div>
    }
    </>
  )
}

export default Canvas