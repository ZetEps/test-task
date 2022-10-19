import { Figure } from "../Elements/Figure";

export class State {
  private State: any;

  constructor() {
    this.State = {};
  }

  public push = (element: Figure) => {
    if (this.State[element.type]) {
      this.State[element.type].push(element);
    } else {
      this.State[element.type] = [element];
    }
  };

  public delete = (id: string, type: string) => {
    this.State[type] = this.State[type].filter((element: Figure) => {
      if (element.id === id) return false;
      else return true;
    });
  };

  public get = (type: string) => {
    if (this.State[type]) {
      return this.State[type];
    } else {
      return []
    }
  };

  public update = (type: string, state: Figure[]) => {
    this.State[type] = state
  };

  public getAll = () => {
    let states: Figure[] = [];
    const keys = Object.keys(this.State);
    if (keys.length) {
      for (let i = 0; i < keys.length; i++) {
        states = [...states, ...this.State[keys[i]]];
      }
    }
    return states;
  };

  public clear = (type:string)=>{
    if(this.State[type]){
      this.State[type] = []
    }
  }
}
