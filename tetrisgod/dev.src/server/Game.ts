// server/Game.ts

import {Grid, Score, TetriminoId} from "../Modules";

export class Game {
  private lastFallTime : number;
  private fallSpeed : number;  // millis
  private holdMino : TetriminoId;
  private activeMino : TetriminoId;
  private nextQueue : Array<TetriminoId>;  // push() onto end of array. shift() from front of array.
  private grid : Grid;
  private score: Score;
  private time : number;  // millis
  private timeStart : number;

  constructor(fallSpeed: number = 1000, time: number = 120000) {
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
    this.score = new Score();
    this.time = time;
    this.timeStart = Date.now();
  }

  /**
   * Runs every frame. Handles all game states for a single tetris game instance.
   * This includes handling user input, time functions, score recording, etc...
   * @param socket - user socket object with the action and id params inside of it
   */
  public update(socket : any) : void {
    if (Date.now() - this.timeStart >= this.time) return; // TODO game should end

    // Input processing
    if (socket.keyInput.pressingHold) {
      this.hold();
    }
    else if (socket.keyInput.pressingHardDrop) {
      let cellsMoved = this.grid.harddrop();
      this.score.dropScore("hard",cellsMoved);
    }
    else if (socket.keyInput.pressingSoftDrop) {
      this.grid.move("down");
      this.score.dropScore("soft", 1);
    }
    else if (socket.keyInput.pressingMoveLeft) {
      this.grid.move("left");
    }
    else if (socket.keyInput.pressingMoveRight) {
      this.grid.move("right");
    }
    else if (socket.keyInput.pressingRotateRight) {
      this.grid.rotate("right");
    }
    else if (socket.keyInput.pressingRotateLeft) {
      this.grid.rotate("left");
    }

    // Fall speed processing
    if ((Date.now() - this.lastFallTime) >= this.fallSpeed) {
      this.grid.fall();
      this.lastFallTime = Date.now();
    }

    // Landed processing
    if (this.grid.activeMino.landed) {
      const level = this.grid.getLevel();
      const isTSpin = this.grid.isTSpin();
      const linesCleared = this.grid.completeLines.length;

      this.score.update(linesCleared, level, isTSpin);
      this.grid.clearCompleteLines();
      this.spawnNextTetrimino();
    }

  }

  /**
   * Spawn the next tetrimino on the grid and update the queue
   */
  private spawnNextTetrimino() : void {
    const nextMino : TetriminoId | undefined = this.nextQueue.shift();
    if (nextMino == undefined) {
      throw new Error("Next queue empty while trying to spawn tetrimino");
    }
    this.nextQueue.push(this.getRandomTetriminoId());
    this.grid.spawnTetrimino(nextMino);
    this.activeMino = nextMino;
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
   * If the hold block is not empty spawwn the currently held tetrimino. Otherwise, spawn from next queue.
   */
  private hold() : void {
    let nextMino : TetriminoId | undefined = this.holdMino;
    this.holdMino = this.activeMino;
    this.activeMino = nextMino;

    if (nextMino == TetriminoId.None)
      this.spawnNextTetrimino()
    else {
      this.grid.deleteTetrimino();
      this.grid.spawnTetrimino(nextMino);
      this.lastFallTime = Date.now();
    }
  }

  /**
   * Update the fall speed
   * @param newMsInterval
   */
  public setFallSpeed(newMsInterval: number) {
    this.fallSpeed = newMsInterval;
  }
}