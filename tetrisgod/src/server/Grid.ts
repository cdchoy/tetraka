// server/Grid2d.ts

import { Tetrimino, TetriminoId } from "../Modules"

export type coordinate = [number, number];  // row,col

export class Grid {
  readonly height : number;
  readonly width : number;
  private currPosition : Array<coordinate>;
  private origin : coordinate;
  public activeMino : Tetrimino;
  public matrix : Array<Array<TetriminoId>>;


  constructor(height:number = 10, width:number = 21) {
    this.height = height;
    this.width = width;
    this.currPosition = [];
    this.origin = [0,0];
    this.activeMino = new Tetrimino(TetriminoId.None);

    this.matrix = new Array<Array<TetriminoId>>();
    for (let row = 0; row < height; row++) {
      let newRow = new Array<number>();
      for (let col = 0; col < width; col++) {
          newRow.push(TetriminoId.None);
      }
    this.matrix.push(newRow);
    }
  }

  /**
   * Checks if the potential coordinates are occupied or out of bounds
   * @param coords : array of new 4 coordinates to verify
   */
  private isIllegalMove(coords: Array<coordinate>) : boolean {
    for (let [row,col] of coords) {
      if (row < 0 || row > this.height || col < 0 || col > this.width) return true;  // OutOfBounds
      if (this.matrix[row][col] != TetriminoId.None) return true;  // OccupiedCoordinate
    }
    return false;
  }

  /**
   * Clears matrix of previous tetrimino coordinates and write in new ones
   */
  private updatePosition(newPosition : Array<coordinate>) {
    for (let [row,col] of this.currPosition) {
      this.matrix[row][col] = TetriminoId.None;
    }
    for (let [row,col] of newPosition) {
      this.matrix[row][col] = this.activeMino.id;
    }
    this.currPosition = newPosition;
  }

  /**
   * Writes in new tetrimino to grid
   */
  public spawnTetrimino(type:TetriminoId) : Array<Array<TetriminoId>> {
    this.activeMino = new Tetrimino(type);
    this.origin = [(this.height - 1), (this.width/2 - 2)]
    //todo
    return this.matrix;
  }

  public fall() : Array<Array<TetriminoId>> {
    let newPosition = this.activeMino.moveDown();
    if (this.isIllegalMove(newPosition)) {
      newPosition = this.activeMino.moveUp();
      this.activeMino.landed = true;
    } else {
      this.updatePosition(newPosition);
    }
    return this.matrix;
  }

  public harddrop() : Array<Array<TetriminoId>> {
    let newPosition = this.currPosition;
    while (this.activeMino.landed != true) {
      newPosition = this.activeMino.moveDown();
      if (this.isIllegalMove(newPosition)) {
        this.activeMino.moveUp();
        this.activeMino.landed = true;
        break;
      }
    }
    this.updatePosition(newPosition);
    return this.matrix;
  }

  public softdrop() : Array<Array<TetriminoId>> {
    let newPosition = this.activeMino.moveDown();
    if (this.isIllegalMove(newPosition)) {
      this.activeMino.moveUp();
    } else {
      this.updatePosition(newPosition);
    }
    return this.matrix;
  }

  public rotateRight() : Array<Array<TetriminoId>> {
    //todo
    let newPosition = this.activeMino.rotateRight();
    if (this.i) {

    }
    this.updatePosition(newPosition);
    return this.matrix;
  }

  public rotateLeft() : Array<Array<TetriminoId>> {
    let newPosition = this.activeMino.rotateLeft();
    let canRotate : boolean = false;

    // Kick logic for illegal movement
    if (this.isIllegalMove(newPosition)) {
      const testNums = [2,3,4,5];  // based on SRS test numbers
      for (let n of testNums) {
        let proposed = this.activeMino.kickLeft(n);
        if (this.isIllegalMove(proposed) == false) {
          newPosition = proposed;
          canRotate = true;
          break;
        }
      }
    }

    if (canRotate) this.updatePosition(newPosition);
    return this.matrix;
  }

  public moveLeft() : Array<Array<TetriminoId>> {
    let newPosition = this.activeMino.moveLeft();
    if (this.isIllegalMove(newPosition)) {
      this.activeMino.moveRight();
    } else {
      this.updatePosition(newPosition);
    }
    return this.matrix;
  }

  public moveRight() : Array<Array<TetriminoId>> {
    let newPosition = this.activeMino.moveRight();
    if (this.isIllegalMove(newPosition)) {
      this.activeMino.moveLeft();
    } else {
      this.updatePosition(newPosition);
    }
    return this.matrix;
  }

}
