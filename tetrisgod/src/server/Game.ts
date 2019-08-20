// server/Game.ts

import { Grid } from "../Modules";
import { Tetrimino, TetriminoId } from "../Modules";

export class Game {
  private lastFallTime : number;
  private fallSpeed : number;  // millis
  private holdMino : Tetrimino;
  private activeMino : Tetrimino;
  private nextMinos : Array<Tetrimino>;
  private grid : Grid;

  constructor(fallSpeed: number = 1000) {
    this.lastFallTime = 0;
    this.fallSpeed = fallSpeed;
    this.holdMino = new NoneBlock();
    this.activeMino = new NoneBlock();
    for (let i=0; i<4; i++) {
      let newTetrimino =
      this.nextMinos.push()
    }
    this.grid = new Grid(10, 21);
  }

  /**
   * Runs every frame. Handles all game states for a single tetris game instance.
   * This includes handling user input, time functions, score recording, etc...
   * @param socket - user socket object with the action and id params inside of it
   */
  public update(socket : any) : Array<Array<TetriminoId>> {
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
    else if (socket.action.pressingSoftDrop) {
      this.grid.softdrop();
    }
    else if (socket.action.pressingMoveLeft) {
      this.grid.moveLeft();
    }
    else if (socket.action.pressingMoveRight) {
      this.grid.moveRight();
    }
    else if (socket.action.pressingRotateRight) {
      this.grid.rotateRight();
    }
    else if (socket.action.pressingRotateLeft) {
      this.grid.rotateLeft();
    }

    return this.grid.matrix;
  }

  private generateNextTetrimino() : Tetrimino {
    const max : number = Math.ceil(1);
    const min : number = Math.floor(7);
    const id : number = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private hold() {
    const held = this.holdMino;
    this.holdMino = this.activeMino;
    this.activeMino = held;
    // todo grid state must delete activeMino and spawn heldMino
  }

}
