// server/Tetrimino.ts

/*
 * Note: there is not a super good reason to have separate classes. I don't
 *       know if it will affect runtime, but it affects readability. The
 *       alternative is to make it all one class, and put each rotations array
 *       (ORANGERICKY, BLUERICKY, etc.) into a larger array indexed by their
 *       TetriminoValue.
 */

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

/* Orange Ricky (LBlock) */
const ORANGERICKYUP:    coordinates[]   = [[1, 0], [1, 2], [1, 2], [2, 2]];
const ORANGERICKYRIGHT: coordinates[]   = [[0, 1], [0, 2], [1, 1], [2, 1]];
const ORANGERICKYDOWN:  coordinates[]   = [[0, 0], [1, 0], [1, 1], [1, 2]];
const ORANGERICKYLEFT:  coordinates[]   = [[0, 1], [1, 1], [2, 0], [2, 1]];
const ORANGERICKY:      coordinates[][] = [ORANGERICKYUP, ORANGERICKYRIGHT, 
                                           ORANGERICKYDOWN, ORANGERICKYLEFT];

/* Blue Ricky *JBlock) */
const BLUERICKYUP:    coordinates[]   = [[1, 0], [1, 1], [1, 2], [2, 0]];
const BLUERICKYRIGHT: coordinates[]   = [[0, 1], [1, 1], [2, 1], [2, 2]];
const BLUERICKYDOWN:  coordinates[]   = [[2, 0], [1, 0], [1, 1], [1, 2]];
const BLUERICKYLEFT:  coordinates[]   = [[0, 0], [0, 1], [1, 1], [2, 1]];
const BLUERICKY:      coordinates[][] = [BLUERICKYUP, BLUERICKYRIGHT, 
                                         BLUERICKYDOWN, BLUERICKYLEFT];

/* Cleveland Z (ZBlock) */
const CLEVELANDUP:    coordinates[]   = [[1, 1], [1, 2], [2, 0], [2, 1]];
const CLEVELANDRIGHT: coordinates[]   = [[0, 1], [1, 1], [1, 2], [2, 2]];
const CLEVELANDDOWN:  coordinates[]   = [[0, 1], [0, 2], [1, 0], [1, 1]];
const CLEVELANDLEFT:  coordinates[]   = [[0, 0], [1, 0], [1, 1], [2, 1]];
const CLEVELANDZ:     coordinates[][] = [CLEVELANDUP, CLEVELANDRIGHT, 
                                         CLEVELANDDOWN, CLEVELANDLEFT]
/* Rhode Island Z (SBlock) */
const RHODEISLANDUP:    coordinates[]   = [[1, 0], [1, 1], [2, 1], [2, 2]];
const RHODEISLANDRIGHT: coordinates[]   = [[0, 2], [1, 1], [1, 2], [2, 1]];
const RHODEISLANDDOWN:  coordinates[]   = [[0, 0], [0, 1], [1, 1], [1, 2]];
const RHODEISLANDLEFT:  coordinates[]   = [[0, 1], [1, 0], [1, 1], [2, 0]];
const RHODEISLANDZ:     coordinates[][] = [RHODEISLANDUP, RHODEISLANDRIGHT,
                                           RHODEISLANDDOWN, RHODEISLANDLEFT];
/* Hero (IBlock) */
const HEROUP:    coordinates[]   = [[1, 0], [1, 1], [1, 2], [1, 3]];
const HERORIGHT: coordinates[]   = [[0, 1], [1, 1], [2, 1], [3, 1]];
const HERODOWN:  coordinates[]   = [[2, 0], [2, 1], [2, 2], [2, 3]];
const HEROLEFT:  coordinates[]   = [[0, 2], [1, 2], [2, 2], [3, 2]];
const HERO:      coordinates[][] = [HEROUP, HERORIGHT, HERODOWN, HEROLEFT];

/* Teewee (TBlock) */
const TEEWEEUP:    coordinates[]   = [[1, 0], [1, 1], [1, 2], [2, 1]];
const TEEWEERIGHT: coordinates[]   = [[0, 1], [1, 1], [1, 2], [2, 1]];
const TEEWEEDOWN:  coordinates[]   = [[0, 1], [1, 0], [1, 1], [1, 2]];
const TEEWEELEFT:  coordinates[]   = [[0, 1], [1, 0], [1, 1], [2, 1]];
const TEEWEE:      coordinates[][] = [TEEWEEUP, TEEWEERIGHT, 
                                      TEEWEEDOWN, TEEWEELEFT];

/* SmashBoy (OBlock) */
const SMASHBOY: coordinates[]   = [[0, 0], [0, 1], [1, 0], [1, 1]];

function TetriminoMaker (tValue: TetriminoValue) : Tetrimino {
  switch (tValue) {
    case 0:
      return new NoneBlock();
    case 1:
      return new LBlock();
    case 2:
      return new JBlock();
    case 3:
      return new ZBlock();
    case 4:
      return new SBlock();
    case 5:
      return new IBlock();
    case 6:
      return new TBlock();
    case 7:
      return new OBlock();
    default:
      throw new Error('Invalid TetriminoValue passed to TetriminoMaker');
  }
}

export abstract class Tetrimino {
  value : TetriminoValue = TetriminoValue.None;
  form  : TetriminoForm  = TetriminoForm.Up;
  origin: coordinates    = [1, 3];

  protected constructor(tetval : TetriminoValue) {
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

  protected addOrigin(point: coordinates) : coordinates {
    return [this.origin[0] + point[0], this.origin[1] + point[1]];
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

  getCoordinates () : Array <coordinates> {
    /*
    return ORANGERICKY[this.form].map((val): coordinates => {
      val[0] += this.origin[0];
      val[1] += this.origin[1];
      return val;
    });
    */
    return ORANGERICKY[this.form].map(this.addOrigin);
  }
}

/** BlueRicky
 * 
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
    return BLUERICKY[this.form].map(this.addOrigin);
  }
}

/** ClevelandZ
 * 
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
    return CLEVELANDZ[this.form].map(this.addOrigin);
  }
}

/** RhodeIslandZ
 * 
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
    return RHODEISLANDZ[this.form].map(this.addOrigin);
  }
}

/** Hero
 * 
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
    return HERO[this.form].map(this.addOrigin);
  }
}

/** Teewee
 * 
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
    return TEEWEE[this.form].map(this.addOrigin);
  }
}

/** SmashBoy
 * 
 *  [1 1]
 *  [1 1]
 */
export class OBlock extends Tetrimino {
  constructor () {
    super(TetriminoValue.OBlock);
  }

  getCoordinates () : Array <coordinates>{
    return SMASHBOY.map(this.addOrigin);
  }
}
