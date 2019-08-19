// server/Tetrimino.ts

import {coordinates} from "../Modules"

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
  private id : TetriminoId;
  private form  : TetriminoForm;
  private origin: coordinates;
  private tetriminoCoords: Array<Array<coordinates>>;

  protected constructor(id : TetriminoId) {
    this.id = id;
    this.form = TetriminoForm.Up;
    this.origin = [1,3]
    this.tetriminoCoords = setupCoords(id);
  }

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

  public addOrigin(point: coordinates) : coordinates {
    return [this.origin[0] + point[0], this.origin[1] + point[1]];
  }

  public getCoordinates() {
    this.tetriminoCoords[this.form].map(this.addOrigin);
  }
}

function setupCoords(id : TetriminoId) : Array<Array<coordinates>> {
  let upCoords    : Array<coordinates>;
  let rightCoords : Array<coordinates>;
  let downCoords  : Array<coordinates>;
  let leftCoords  : Array<coordinates>;

  switch (id) {
    case TetriminoId.None:
      return [[]];
    case TetriminoId.LBlock:  // Orange Ricky
      upCoords    = [[1, 0], [1, 2], [1, 2], [2, 2]];  // [0 0 1]  |  [0 1 0]  |  [0 0 0]  |  [1 1 0]
      rightCoords = [[0, 1], [0, 2], [1, 1], [2, 1]];  // [1 1 1]  |  [0 1 0]  |  [1 1 1]  |  [0 1 0]
      downCoords  = [[0, 0], [1, 0], [1, 1], [1, 2]];  // [0 0 0]  |  [0 1 1]  |  [1 0 0]  |  [0 1 0]
      leftCoords  = [[0, 1], [1, 1], [2, 0], [2, 1]];  //   UP         RIGHT       DOWN        LEFT
      break;
    case TetriminoId.JBlock:  // Blue Ricky
      upCoords    = [[1, 0], [1, 1], [1, 2], [2, 0]];  // [1 0 0]  |  [0 1 1]  |  [0 0 0]  |  [0 1 0]
      rightCoords = [[0, 1], [1, 1], [2, 1], [2, 2]];  // [1 1 1]  |  [0 1 0]  |  [1 1 1]  |  [0 1 0]
      downCoords  = [[2, 0], [1, 0], [1, 1], [1, 2]];  // [0 0 0]  |  [0 1 0]  |  [0 0 1]  |  [1 1 0]
      leftCoords  = [[0, 0], [0, 1], [1, 1], [2, 1]];  //   UP         RIGHT       DOWN        LEFT
      break;
    case TetriminoId.ZBlock:  // Cleveland Z
      upCoords    = [[1, 1], [1, 2], [2, 0], [2, 1]];  // [1 1 0]  |  [0 0 1]  |  [0 0 0]  |  [0 1 0]
      rightCoords = [[0, 1], [1, 1], [1, 2], [2, 2]];  // [0 1 1]  |  [0 1 1]  |  [1 1 0]  |  [1 1 0]
      downCoords  = [[0, 1], [0, 2], [1, 0], [1, 1]];  // [0 0 0]  |  [0 1 0]  |  [0 1 1]  |  [1 0 0]
      leftCoords  = [[0, 0], [1, 0], [1, 1], [2, 1]];  //   UP         RIGHT       DOWN        LEFT
      break;
    case TetriminoId.SBlock:  // Rhode Island Z
      upCoords    = [[1, 0], [1, 1], [2, 1], [2, 2]];  // [0 1 1]  |  [0 1 0]  |  [0 0 0]  |  [1 0 0]
      rightCoords = [[0, 2], [1, 1], [1, 2], [2, 1]];  // [1 1 0]  |  [0 1 1]  |  [0 1 1]  |  [1 1 0]
      downCoords  = [[0, 0], [0, 1], [1, 1], [1, 2]];  // [0 0 0]  |  [0 0 1]  |  [1 1 0]  |  [0 1 0]
      leftCoords  = [[0, 1], [1, 0], [1, 1], [2, 0]];  //   UP         RIGHT       DOWN        LEFT
      break;
    case TetriminoId.IBlock:  // Hero
      upCoords    = [[1, 0], [1, 1], [1, 2], [1, 3]];  // [0 0 0 0]  |  [0 1 0 0]  |  [0 0 0 0]  |  [0 0 1 0]
      rightCoords = [[0, 1], [1, 1], [2, 1], [3, 1]];  // [0 0 0 0]  |  [0 1 0 0]  |  [1 1 1 1]  |  [0 0 1 0]
      downCoords  = [[2, 0], [2, 1], [2, 2], [2, 3]];  // [1 1 1 1]  |  [0 1 0 0]  |  [0 0 0 0]  |  [0 0 1 0]
      leftCoords  = [[0, 2], [1, 2], [2, 2], [3, 2]];  // [0 0 0 0]  |  [0 1 0 0]  |  [0 0 0 0]  |  [0 0 1 0]
      break;                                           //    UP           RIGHT         DOWN          LEFT
    case TetriminoId.TBlock:  // Teewee
      upCoords    = [[1, 0], [1, 1], [1, 2], [2, 1]];  // [0 1 0]  |  [0 1 0]  |  [0 0 0]  |  [0 1 0]
      rightCoords = [[0, 1], [1, 1], [1, 2], [2, 1]];  // [1 1 1]  |  [0 1 1]  |  [1 1 1]  |  [1 1 0]
      downCoords  = [[0, 1], [1, 0], [1, 1], [1, 2]];  // [0 0 0]  |  [0 1 0]  |  [0 1 0]  |  [0 1 0]
      leftCoords  = [[0, 1], [1, 0], [1, 1], [2, 1]];  //   UP         RIGHT       DOWN        LEFT
      break;
    case TetriminoId.OBlock:  // Smashboy
      upCoords    = [[0, 0], [0, 1], [1, 0], [1, 1]];  // [1 1]
      rightCoords = [[0, 0], [0, 1], [1, 0], [1, 1]];  // [1 1]
      downCoords  = [[0, 0], [0, 1], [1, 0], [1, 1]];  //  ALL
      leftCoords  = [[0, 0], [0, 1], [1, 0], [1, 1]];
      break;
    default:
      throw new Error('Invalid TetriminoId passed to TetriminoMaker');
  }

  return [upCoords, rightCoords, downCoords, leftCoords]
}