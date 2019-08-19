// server/Tetrimino.ts

import {coordinates} from "../Modules"

export enum TetriminoValue {
  None   = 0,
  LBlock = 1,
  JBlock = 2,
  ZBlock = 3,
  SBlock = 4,
  IBlock = 5,
  TBlock = 6,
  OBlock = 7,
}

export enum TetriminoForm {
  Up    = 0,
  Right = 1,
  Down  = 2,
  Left  = 3,
}

const ORANGERICKYUP:    coordinates[] = [[1, 0], [1, 2], [1, 3], [2, 2]];
const ORANGERICKYRIGHT: coordinates[] = [[0, 1], [1, 1], [2, 1], [0, 2]];
const ORANGERICKYDOWN:  coordinates[] = [[0, 0], [1, 0], [1, 1], [1, 2]];
const ORANGERICKYLEFT:  coordinates[] = [[0, 1], [1, 1], [2, 0], [2, 1]];

const BLUERICKYUP:     coordinates[] = [[1, 0], [1, 2], [1, 3], [2, 0]];
const BLUERICKYRIGHT: coordinates[] = [[0, 1], [1, 1], [2, 1], [2, 2]];
const BLUERICKYDOWN:  coordinates[] = [[2, 0], [1, 0], [1, 1], [1, 2]];
const BLUERICKYLEFT:  coordinates[] = [[0, 0], [0, 1], [1, 1], [2, 1]];

const rotations: coordinates[][][] = [
  /* None Block */
  [],
  /* Orange Ricky */
  [ORANGERICKYUP, ORANGERICKYRIGHT, ORANGERICKYDOWN, ORANGERICKYLEFT],
  /* Blue Ricky */
  [BLUERICKYUP, BLUERICKYRIGHT, BLUERICKYDOWN, BLUERICKYLEFT],
  /* Cleveland Z */
  [],
  /* Rhode Island Z */
  [],
  /* Hero */
  [],
  /* Teewee */
  [],
  /* Smash Boy */
  []
];

export abstract class Tetrimino {
  value : TetriminoValue = TetriminoValue.None;
  form  : TetriminoForm  = TetriminoForm.Up;
  origin: coordinates    = [1, 3];

  constructor(tetval : TetriminoValue) {
    this.value = tetval;
  }
  public abstract getCoordinates() : Array<coordinates>;

  public moveUp() {
    this.origin[0] += 1;
  }

  public moveLeft() {
    this.origin[1] -= 1; 
  }

  public moveRight() {
    this.origin[1] += 1;
  }

  public moveDown() {
    this.origin[0] -= 1;
  }

  public rotateRight() {
    this.form = (this.form + 1) % 4;
  }

  public rotateLeft() {
    this.form = (this.form + 3) % 4;
  }
}

export class NoneBlock extends Tetrimino {
  constructor () {
    super(TetriminoValue.None);
  }

  getCoordinates () : Array <coordinates>{
    return [this.origin];
  }
}

/**
 *  [0 0 1]  |  [0 1 0]  |  [0 0 0]  |  [1 1 0]
 *  [1 1 1]  |  [0 1 0]  |  [1 1 1]  |  [0 1 0]
 *  [0 0 0]  |  [0 1 1]  |  [1 0 0]  |  [0 1 0]
 *    UP         RIGHT       DOWN        LEFT
 */
export class LBlock extends Tetrimino {
  constructor () {
    super(TetriminoValue.LBlock);
  }

  getCoordinates () : Array <coordinates>{
    return [this.origin];
  }
}

/**
 *  [1 0 0]  |  [0 1 1]  |  [0 0 0]  |  [0 1 0]
 *  [1 1 1]  |  [0 1 0]  |  [1 1 1]  |  [0 1 0]
 *  [0 0 0]  |  [0 1 0]  |  [0 0 1]  |  [1 1 0]
 *    UP         RIGHT       DOWN        LEFT
 */
export class JBlock extends Tetrimino {
  constructor () {
    super(TetriminoValue.JBlock);
  }

  getCoordinates () : Array <coordinates>{
    return [this.origin];
  }
}

/**
 *  [1 1 0]  |  [0 0 1]  |  [0 0 0]  |  [0 1 0]
 *  [0 1 1]  |  [0 1 1]  |  [1 1 0]  |  [1 1 0]
 *  [0 0 0]  |  [0 1 0]  |  [0 1 1]  |  [1 0 0]
 *    UP         RIGHT       DOWN        LEFT
 */
export class ZBlock extends Tetrimino {
  constructor () {
    super(TetriminoValue.ZBlock);
  }

  getCoordinates () : Array <coordinates>{
    return [this.origin];
  }
}

/**
 *  [0 1 1]  |  [0 1 0]  |  [0 0 0]  |  [1 0 0]
 *  [1 1 0]  |  [0 1 1]  |  [0 1 1]  |  [1 1 0]
 *  [0 0 0]  |  [0 0 1]  |  [1 1 0]  |  [0 1 0]
 *    UP         RIGHT       DOWN        LEFT
 */
export class SBlock extends Tetrimino {
  constructor () {
    super(TetriminoValue.SBlock);
  }

  getCoordinates () : Array <coordinates>{
    return [this.origin];
  }
}

/**
 *  [0 0 0 0]  |  [0 1 0 0]  |  [0 0 0 0]  |  [0 0 1 0]
 *  [0 0 0 0]  |  [0 1 0 0]  |  [1 1 1 1]  |  [0 0 1 0]
 *  [1 1 1 1]  |  [0 1 0 0]  |  [0 0 0 0]  |  [0 0 1 0]
 *  [0 0 0 0]  |  [0 1 0 0]  |  [0 0 0 0]  |  [0 0 1 0]
 *     UP           RIGHT         DOWN          LEFT
 */
export class IBlock extends Tetrimino {
  constructor () {
    super(TetriminoValue.IBlock);
  }

  getCoordinates () : Array <coordinates>{
    return [this.origin];
  }
}

/**
 *  [0 1 0]  |  [0 1 0]  |  [0 0 0]  |  [0 1 0]
 *  [1 1 1]  |  [0 1 1]  |  [1 1 1]  |  [1 1 0]
 *  [0 0 0]  |  [0 1 0]  |  [0 1 0]  |  [0 1 0]
 *    UP         RIGHT       DOWN        LEFT
 */
export class TBlock extends Tetrimino {
  constructor () {
    super(TetriminoValue.TBlock);
  }

  getCoordinates () : Array <coordinates>{
    return [this.origin];
  }
}

/**
 *  [1 1]
 *  [1 1]
 */
export class OBlock extends Tetrimino {
  constructor () {
    super(TetriminoValue.OBlock);
  }

  getCoordinates () : Array <coordinates>{
    return [this.origin];
  }
}