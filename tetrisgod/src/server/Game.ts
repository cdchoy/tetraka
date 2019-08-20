// server/Game.ts

import {Grid, Tetrimino, TetriminoId} from "../Modules";

export class Game {
  private lastFallTime : number;
  private fallSpeed : number;  // millis
  private holdMino : TetriminoId;
  private activeMino : TetriminoId;
  private nextMinos : Array<TetriminoId>;
  private grid : Grid;

  constructor(fallSpeed: number = 1000) {
    this.lastFallTime = 0;
    this.fallSpeed = fallSpeed;
    this.holdMino = TetriminoId.None;
    this.activeMino = TetriminoId.None;

    this.nextMinos = [];
    for (let i=0; i<4; i++) {
      let nextMino = this.generateNextTetrimino();
      this.nextMinos.push(nextMino);
    }
    this.grid = new Grid(10, 21);
  }

  /**
   * Runs every frame. Handles all game states for a single tetris game instance.
   * This includes handling user input, time functions, score recording, etc...
   * @param socket - user socket object with the action and id params inside of it
   */
  public update(socket : any) : Array<Array<TetriminoId>> {

    // Input processing
    if (socket.action.pressingHold) {
      this.hold();
    }
    else if (socket.action.pressingHardDrop) {
      this.grid.harddrop();
    }
    else if (socket.action.pressingSoftDrop) {
      this.grid.moveTetrimino("down");
    }
    else if (socket.action.pressingMoveLeft) {
      this.grid.moveTetrimino("left");
    }
    else if (socket.action.pressingMoveRight) {
      this.grid.moveTetrimino("right");
    }
    else if (socket.action.pressingRotateRight) {
      this.grid.rotateRight();
    }
    else if (socket.action.pressingRotateLeft) {
      this.grid.rotateLeft();
    }

    // Fall speed processing
    if ((Date.now() - this.lastFallTime) >= this.fallSpeed) {
      this.grid.fall();
      this.lastFallTime = Date.now();
    }
    return this.grid.matrix;
  }

  private generateNextTetrimino() : TetriminoId {  // generate 1 of the 7 valid TetriminoIds
    const max : number = Math.ceil(1);
    const min : number = Math.floor(7);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private hold() {
    const held = this.holdMino;
    this.holdMino = this.activeMino;
    this.activeMino = held;

    this.grid.deleteTetrimino();
    this.grid.spawnTetrimino(held);
  }

  public setFallSpeed(newMsInterval: number) {
    this.fallSpeed = newMsInterval;
  }
}
