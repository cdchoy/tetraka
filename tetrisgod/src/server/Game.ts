// server/Game.ts

import { Grid } from "../Modules";
import { Tetrimino, TetriminoValue }
import { NoneBlock, JBlock, LBlock, ZBlock, SBlock, IBlock, TBlock, OBlock } from "../Modules"

export class Game {
  private lastFallTime : number;
  private fallSpeed : number;  // millis
  private holdMino : Tetrimino;
  private activeMino : Tetrimino;
  private grid : Grid;

  constructor(fallSpeed: number = 1000) {
    this.lastFallTime = 0;
    this.fallSpeed = fallSpeed;
    this.holdMino = new NoneBlock();
    this.activeMino = new NoneBlock();
    this.grid = new Grid(10, 21);
  }

  public update(socket : any) : Array<Array<TetriminoValue>> {
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

    return this.grid.matrix;
  }

  private hold() {
    const held = this.holdMino;
    this.holdMino = this.activeMino;
    this.activeMino = held;
    // todo grid state must delete activeMino and spawn heldMino
  }

}
