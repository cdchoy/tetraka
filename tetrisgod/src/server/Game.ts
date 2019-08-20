// server/Game.ts

import {Grid, TetriminoId} from "../Modules";

export class Game {
  private lastFallTime : number;
  private fallSpeed : number;  // millis
  private holdMino : TetriminoId;
  private activeMino : TetriminoId;
  private nextQueue : Array<TetriminoId>;  // push() onto end of array. shift() from front of array.
  private grid : Grid;

  private score : number;
  private time : number;
  private lines : number;

  constructor(fallSpeed: number = 1000) {
    this.lastFallTime = 0;
    this.fallSpeed = fallSpeed;
    this.holdMino = TetriminoId.None;
    this.activeMino = TetriminoId.None;

    this.nextQueue = [];
    for (let i=0; i<4; i++) {
      let nextMino = this.getRandomTetriminoId();
      this.nextQueue.push(nextMino);
    }
    this.grid = new Grid(10, 21);
  }

  /**
   * Runs every frame. Handles all game states for a single tetris game instance.
   * This includes handling user input, time functions, score recording, etc...
   * @param socket - user socket object with the action and id params inside of it
   */
  public update(socket : any) : void {
    // Input processing
    if (socket.action.pressingHold) {
      this.hold();
    }
    else if (socket.action.pressingHardDrop) {
      this.grid.harddrop();
    }
    else if (socket.action.pressingSoftDrop) {
      this.grid.move("down");
    }
    else if (socket.action.pressingMoveLeft) {
      this.grid.move("left");
    }
    else if (socket.action.pressingMoveRight) {
      this.grid.move("right");
    }
    else if (socket.action.pressingRotateRight) {
      this.grid.rotate("right");
    }
    else if (socket.action.pressingRotateLeft) {
      this.grid.rotate("left");
    }

    // Fall speed processing
    if ((Date.now() - this.lastFallTime) >= this.fallSpeed) {
      this.grid.fall();
      this.lastFallTime = Date.now();
    }

    // Landed Check
    if (this.grid.activeMino.landed) {
      const linesCleared = this.grid.clearCompleteLines();
      this.updateScore(linesCleared);
      this.spawnTetrimino();
    }

  }

  /**
   * Spawn the next tetrimino on the grid and update the queue
   */
  private spawnTetrimino() {
    const nextMino : TetriminoId | undefined = this.nextQueue.shift();
    this.nextQueue.push(this.getRandomTetriminoId());
    this.grid.spawnTetrimino(nextMino);
    this.lastFallTime = Date.now();
  }

  /**
   * Randomly generate 1 of the 7 valid TetriminoIds
   */
  private getRandomTetriminoId() : TetriminoId {
    const max : number = Math.ceil(1);
    const min : number = Math.floor(7);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Move the current tetrimino into the hold block.
   * If the hold block is not empty spawn the currently held tetrimino. Otherwise, spawn from next queue.
   */
  private hold() : void {
    let nextMino : TetriminoId | undefined = this.holdMino;
    this.holdMino = this.activeMino;
    this.activeMino = nextMino;

    if (nextMino == TetriminoId.None)
      this.spawnTetrimino()
    else {
      this.grid.deleteTetrimino();
      this.grid.spawnTetrimino(nextMino);
      this.lastFallTime = Date.now();
    }

  }

  /**
   * Updates score and sends lines to opponent
   */
  private updateScore(linesCleared: number){
    // TODO
  }

  /**
   * Update the fall speed
   * @param newMsInterval
   */
  public setFallSpeed(newMsInterval: number) {
    this.fallSpeed = newMsInterval;
  }
}
