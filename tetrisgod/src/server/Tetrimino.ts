// server/Tetrimino.ts

import { coordinate } from "../Modules"

export enum TetriminoId {
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


export class Tetrimino {
  public id : TetriminoId;
  private form  : TetriminoForm;
  private tetriminoCoords: Array<Array<coordinate>>;
  public landed : boolean;

  constructor(id : TetriminoId) {
    this.id = id;
    this.form = TetriminoForm.Up;
    this.tetriminoCoords = setupCoords(id);
    this.landed = false;
  }

  private addOrigin(point: coordinate) : coordinate {
    return [this.origin[0] + point[0], this.origin[1] + point[1]];
  }

  private getCoordinates() : Array<coordinate> {
    return this.tetriminoCoords[this.form].map(this.addOrigin);
  }

  public moveUp() : Array<coordinate> {
    this.origin[0] += 1;
    return this.getCoordinates();
  }

  public moveLeft() : Array<coordinate> {
    this.origin[1] -= 1;
    return this.getCoordinates();
  }

  public moveRight() : Array<coordinate> {
    this.origin[1] += 1;
    return this.getCoordinates();
  }

  public moveDown() : Array<coordinate> {
    this.origin[0] -= 1;
    return this.getCoordinates();
  }

  public rotateRight() : Array<coordinate> {
    this.form = (this.form + 1) % 4;
    return this.getCoordinates();
  }

  public rotateLeft() : Array<coordinate> {
    this.form = (this.form + 3) % 4;
    return this.getCoordinates();
  }

  public kickRight(testNum : number) : Array<coordinate> {
    let position : Array<coordinate>;
    if (this.id in [TetriminoId.JBlock, TetriminoId.LBlock, TetriminoId.ZBlock, TetriminoId.SBlock,TetriminoId.TBlock]) {
      switch (testNum) {
        case 2:
        case 3:
        case 4:
        case 5:
        default:
          throw new Error("kickRight received unknown testNum");
      }
    }
    else if (this.id == TetriminoId.IBlock) {
      switch (testNum) {
        case 2:
        case 3:
        case 4:
        case 5:
        default:
          throw new Error("kickRight received unknown testNum");
      }
    }
  }

  public kickLeft(testNum : number) : Array<coordinate> {
    let position : Array<coordinate>;
    if (this.id in [TetriminoId.JBlock, TetriminoId.LBlock, TetriminoId.ZBlock, TetriminoId.SBlock,TetriminoId.TBlock]) {
      switch (testNum) { // based on SRS test numbers
        case 2:
        case 3:
        case 4:
        case 5:
        default:
          throw new Error("kickRight received unknown testNum");
      }
    }
    else if (this.id == TetriminoId.IBlock) {
      switch (testNum) {
        case 2:
        case 3:
        case 4:
        case 5:
        default:
          throw new Error("kickRight received unknown testNum");
      }
    }
    return position;
  }


}

function setupCoords(id : TetriminoId) : Array<Array<coordinate>> {
  switch (id) {
    case TetriminoId.None:
      return [[]];
    case TetriminoId.LBlock:  // Orange Ricky
      return [L_UP, L_RIGHT, L_DOWN, L_LEFT];
    case TetriminoId.JBlock:  // Blue Ricky
      return [J_UP, J_RIGHT, J_DOWN, J_LEFT];
    case TetriminoId.ZBlock:  // Cleveland Z
      return [Z_UP, Z_RIGHT, Z_DOWN, Z_LEFT];
    case TetriminoId.SBlock:  // Rhode Island Z
      return [S_UP, S_RIGHT, S_DOWN, S_LEFT];
    case TetriminoId.IBlock:  // Hero
      return [I_UP, I_RIGHT, I_DOWN, I_LEFT];
    case TetriminoId.TBlock:  // Teewee
      return [T_UP, T_RIGHT, T_DOWN, T_LEFT];
    case TetriminoId.OBlock:  // Smashboy
      return [O_ALL, O_ALL, O_ALL, O_ALL];
    default:
      throw new Error('Invalid TetriminoId passed to TetriminoMaker');
  }
}


/** Orange Ricky (LBlock) */
const L_UP    : Array<coordinate> = [[1, 0], [1, 2], [1, 2], [2, 2]];  // [0 0 1]  |  [0 1 0]  |  [0 0 0]  |  [1 1 0]
const L_RIGHT : Array<coordinate> = [[0, 1], [0, 2], [1, 1], [2, 1]];  // [1 1 1]  |  [0 1 0]  |  [1 1 1]  |  [0 1 0]
const L_DOWN  : Array<coordinate> = [[0, 0], [1, 0], [1, 1], [1, 2]];  // [0 0 0]  |  [0 1 1]  |  [1 0 0]  |  [0 1 0]
const L_LEFT  : Array<coordinate> = [[0, 1], [1, 1], [2, 0], [2, 1]];  //   UP         RIGHT       DOWN        LEFT

/** Blue Ricky (JBlock) */
const J_UP    : Array<coordinate> = [[1, 0], [1, 1], [1, 2], [2, 0]];  // [1 0 0]  |  [0 1 1]  |  [0 0 0]  |  [0 1 0]
const J_RIGHT : Array<coordinate> = [[0, 1], [1, 1], [2, 1], [2, 2]];  // [1 1 1]  |  [0 1 0]  |  [1 1 1]  |  [0 1 0]
const J_DOWN  : Array<coordinate> = [[2, 0], [1, 0], [1, 1], [1, 2]];  // [0 0 0]  |  [0 1 0]  |  [0 0 1]  |  [1 1 0]
const J_LEFT  : Array<coordinate> = [[0, 0], [0, 1], [1, 1], [2, 1]];  //   UP         RIGHT       DOWN        LEFT

/** Cleveland Z (ZBlock) */
const Z_UP    : Array<coordinate> = [[1, 1], [1, 2], [2, 0], [2, 1]];  // [1 1 0]  |  [0 0 1]  |  [0 0 0]  |  [0 1 0]
const Z_RIGHT : Array<coordinate> = [[0, 1], [1, 1], [1, 2], [2, 2]];  // [0 1 1]  |  [0 1 1]  |  [1 1 0]  |  [1 1 0]
const Z_DOWN  : Array<coordinate> = [[0, 1], [0, 2], [1, 0], [1, 1]];  // [0 0 0]  |  [0 1 0]  |  [0 1 1]  |  [1 0 0]
const Z_LEFT  : Array<coordinate> = [[0, 0], [1, 0], [1, 1], [2, 1]];  //   UP         RIGHT       DOWN        LEFT

/** Rhode Island Z (SBlock) */
const S_UP    : Array<coordinate> = [[1, 0], [1, 1], [2, 1], [2, 2]];  // [0 1 1]  |  [0 1 0]  |  [0 0 0]  |  [1 0 0]
const S_RIGHT : Array<coordinate> = [[0, 2], [1, 1], [1, 2], [2, 1]];  // [1 1 0]  |  [0 1 1]  |  [0 1 1]  |  [1 1 0]
const S_DOWN  : Array<coordinate> = [[0, 0], [0, 1], [1, 1], [1, 2]];  // [0 0 0]  |  [0 0 1]  |  [1 1 0]  |  [0 1 0]
const S_LEFT  : Array<coordinate> = [[0, 1], [1, 0], [1, 1], [2, 0]];  //   UP         RIGHT       DOWN        LEFT

/** Hero (IBlock) */                                                   // [0 0 0 0]  |  [0 1 0 0]  |  [0 0 0 0]  |  [0 0 1 0]
const I_UP    : Array<coordinate> = [[1, 0], [1, 1], [1, 2], [1, 3]];  // [0 0 0 0]  |  [0 1 0 0]  |  [1 1 1 1]  |  [0 0 1 0]
const I_RIGHT : Array<coordinate> = [[0, 1], [1, 1], [2, 1], [3, 1]];  // [1 1 1 1]  |  [0 1 0 0]  |  [0 0 0 0]  |  [0 0 1 0]
const I_DOWN  : Array<coordinate> = [[2, 0], [2, 1], [2, 2], [2, 3]];  // [0 0 0 0]  |  [0 1 0 0]  |  [0 0 0 0]  |  [0 0 1 0]
const I_LEFT  : Array<coordinate> = [[0, 2], [1, 2], [2, 2], [3, 2]];  //    UP           RIGHT         DOWN          LEFT

/** Teewee (TBlock) */
const T_UP    : Array<coordinate> = [[1, 0], [1, 1], [1, 2], [2, 1]];  // [0 1 0]  |  [0 1 0]  |  [0 0 0]  |  [0 1 0]
const T_RIGHT : Array<coordinate> = [[0, 1], [1, 1], [1, 2], [2, 1]];  // [1 1 1]  |  [0 1 1]  |  [1 1 1]  |  [1 1 0]
const T_DOWN  : Array<coordinate> = [[0, 1], [1, 0], [1, 1], [1, 2]];  // [0 0 0]  |  [0 1 0]  |  [0 1 0]  |  [0 1 0]
const T_LEFT  : Array<coordinate> = [[0, 1], [1, 0], [1, 1], [2, 1]];  //   UP         RIGHT       DOWN        LEFT

/** Smashboy (OBlock) */                                                 // [1 1]
const O_ALL    : Array<coordinate> = [[0, 0], [0, 1], [1, 0], [1, 1]];  // [1 1] ALL
