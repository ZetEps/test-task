import { Coord } from "../core/Line"

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