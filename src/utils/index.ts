import { Coord } from "../Elements/Line"

export const ccw = (A:Coord, B:Coord, C:Coord)=>{
    if(A.x && A.y && B.x && B.y && C.x && C.y){
        return (C.y-A.y) * (B.x-A.x) > (B.y-A.y) * (C.x-A.x)
    }
    
}

export const isIntersect = (A:Coord, B:Coord, C:Coord, D:Coord )=>{
    if(A && B && C && D){
        return ccw(A,C,D) !== ccw(B,C,D) && ccw(A,B,C) !== ccw(A,B,D)
    }
}

export const getCursorPosition = (event:MouseEvent, canvas:HTMLCanvasElement)=>{

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY  - rect.top
    return {x:x, y:y}
    
}

export const Intersection = (fromA: Coord, toA: Coord, fromB:Coord, toB:Coord ) => {
    if (
      fromA.x &&
      toA.x &&
      fromA.y &&
      toA.y &&
      fromB.x &&
      fromB.y &&
      toB.x &&
      toB.y
    ) {
      const c2x = fromB.x - toB.x;
      let c3x = fromA.x - toA.x;

      let c3y = fromA.y - toA.y;
      const c2y = fromB.y - toB.y;

      const d = c3x * c2y - c3y * c2x;

      const u1 = fromA.x * toA.y - fromA.y * toA.x;
      const u4 = fromB.x * toB.y - fromB.y * toB.x;

      const px = (u1 * c2x - c3x * u4) / d;
      const py = (u1 * c2y - c3y * u4) / d;

      return { x: px, y: py };
    }
  };