// server/Game.ts

import { Grid } from "../Modules";
import { Tetrimino, NoneBlock, JBlock, LBlock, ZBlock, SBlock, IBlock, TBlock, OBlock } from "../Modules"

export class Game {
  private lastFallTime : number;
  private fallSpeed : number;  // millis
  private holdPiece : Tetrimino;
  private grid : Grid;

  constructor(fallSpeed: number = 1000) {
    this.lastFallTime = 0;
    this.fallSpeed = fallSpeed;
    this.holdPiece = new NoneBlock();
    this.grid = new Grid(10, 21);
  }

  public update(socket : any) {
    if ((Date.now() - this.lastFallTime) >= this.fallSpeed) {
      this.grid.fall();
      this.lastFallTime = Date.now();
    }

    if (socket.action.pressingHold) {
      this.hold();
    }
    else if (socket.action.pressingHardDrop) {
      this.grid.harddrop();
    }
    else if (socket.action.pressingRotateRight) {
      this.grid.rotateRight();
    }
    else if (socket.action.pressingMoveLeft) {
      this.grid.moveLeft();
    }
    else if (socket.action.pressingMoveRight) {
      this.grid.moveRight();
    }
  }

  private hold() {

  }

}
