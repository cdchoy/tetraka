// server/Tetrimino.ts

import { coordinate } from "./Modules"

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
  readonly id : TetriminoId;
  private form  : TetriminoForm;
  private basicCoordinates: Array<Array<coordinate>>;
  public landed : boolean;

  constructor(id : TetriminoId) {
    this.id = id;
    this.form = TetriminoForm.Up;
    this.basicCoordinates = setupCoords(id);
    this.landed = false;
  }

  private addOrigin(origin:coordinate) : any {
    return function(point : coordinate) : coordinate {
      return [origin[0] + point[0], origin[1] + point[1]]
    };
  }

  public getCoordinates(origin: coordinate) : Array<coordinate> {
    return this.basicCoordinates[this.form].map(this.addOrigin(origin));
  }

  public rotateRight(origin:coordinate) : Array<coordinate> {
    this.form = (this.form + 1) % 4;
    return this.getCoordinates(origin);
  }

  public rotateLeft(origin:coordinate) : Array<coordinate> {
    this.form = (this.form + 3) % 4;
    return this.getCoordinates(origin);
  }

  /**
   * Moves origin coordinate according to "wall kick" rules set by Tetris' Super Rotation System
   * @param origin - the current origin coordinate to transform
   * @param offsetIteration - SRS specifies different origin offsets to apply for numbered kick iteration attempts
   *                          This value is 1 indexed bc fuck me.
   */
  public kickOrigin(origin: coordinate, offsetIteration : number) : coordinate {
    let [originRow, originCol] = origin;

    if (offsetIteration < 1 || offsetIteration > 5)
      throw new Error("Unknown offsetIteration: " + offsetIteration);

    if (this.id in [TetriminoId.JBlock, TetriminoId.LBlock, TetriminoId.ZBlock, TetriminoId.SBlock,TetriminoId.TBlock]) {
      originRow += KICK_OFFSET[offsetIteration - 1][this.form][0];
      originCol += KICK_OFFSET[offsetIteration - 1][this.form][1];
    }

    else if (this.id == TetriminoId.IBlock) {
      originRow += IKICK_OFFSET[offsetIteration - 1][this.form][0];
      originCol += IKICK_OFFSET[offsetIteration - 1][this.form][1];
    }

    return [originRow, originCol];
  }
}

/**
 * Sets up the tetrimino class' base coordinates. Applying these to the grid's origin coordinate will produce
 * the 4 coordinates that the tetrimino is currently at. The origin is set to be the coordinate of the bottom
 * left box in the matrix that makes up the tetrimino.
 * @param id - TetriminoId of the Tetrimino class we're creating
 */
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

/** J,L,Z,S,T Tetrimino Offset Transformation Data for Kicks
 *  Access = KICK_OFFSET[offsetIteration][form][rowAdjustment, colAdjustment]  */
const OFFSET_1 : Array<coordinate> = [[0,0], [0,0],  [0,0], [0,0]];
const OFFSET_2 : Array<coordinate> = [[0,0], [0,1],  [0,0], [0,-1]];
const OFFSET_3 : Array<coordinate> = [[0,0], [-1,1], [0,0], [-1,-1]];
const OFFSET_4 : Array<coordinate> = [[0,0], [2,0],  [0,0], [2,0]];
const OFFSET_5 : Array<coordinate> = [[0,0], [2,1],  [0,0], [2,-1]];
const KICK_OFFSET : Array<Array<coordinate>> = [OFFSET_1, OFFSET_2, OFFSET_3, OFFSET_4, OFFSET_5];

/** I Tetrimino Offset Transformation Data for Kicks
 *  Access = IKICK_OFFSET[offsetIteration][form][rowAdjustment, colAdjustment]  */
const I_OFFSET_1 : Array<coordinate> = [[0,0],  [0,-1], [1,-1], [1,0]];
const I_OFFSET_2 : Array<coordinate> = [[0,-1], [0,0],  [1,1],  [1,0]];
const I_OFFSET_3 : Array<coordinate> = [[0,2],  [0,0],  [1,-2], [1,0]];
const I_OFFSET_4 : Array<coordinate> = [[0,-1], [1,0],  [0,1],  [-1,0]];
const I_OFFSET_5 : Array<coordinate> = [[0,2],  [-2,0], [0,-2], [2,0]];
const IKICK_OFFSET : Array<Array<coordinate>> = [I_OFFSET_1, I_OFFSET_2, I_OFFSET_3, I_OFFSET_4, I_OFFSET_5];

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
