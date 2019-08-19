// server/Game.ts

import { Grid } from "../Modules";

export class Game {
  private lastFallTime : number = 0;
  private fallSpeed : number = 1000;  // millis

  private grid : Grid;

  constructor(fallSpeed: number) {
    this.fallSpeed = fallSpeed;
    this.grid = new Grid();
  }

  public update(socket : any) {
    if ((Date.now() - this.lastFallTime) >= this.fallSpeed) {
      this.grid.fall();
    }
  }


}
