import { Line } from "../Elements/Line";
import { Intersection, isIntersect } from "../utils";

export class Features{

    static findIntersection = (lines:Line[], callback:Function)=>{
        if(lines){
            for(let i = 0; i <= lines.length; i++){
                for(let j = i + 1; j < lines.length; j++ ){
  
                    const result = Intersection(lines[i].getCoord().from, lines[i].getCoord().to, lines[j].getCoord().from, lines[j].getCoord().to)
                    const cond = isIntersect(lines[i].getCoord().from, lines[i].getCoord().to, lines[j].getCoord().from, lines[j].getCoord().to)
  
                    if(result && cond){
                        callback(result)
                    }
  
                }
            }
        }
  }
}