// server/Grid2d.ts

import { Tetrimino, TetriminoId } from "../Modules"

export type coordinate = [number, number];  // row,col

export class Grid {
  readonly height : number;
  readonly width : number;
  private currCoords : Array<coordinate>;
  public activeMino : Tetrimino;
  public matrix : Array<Array<TetriminoId>>;

  constructor(height:number = 10, width:number = 21) {
    this.height = height;
    this.width = width;
    this.currCoords = [];
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

  private isOutOfBounds(coords: Array<coordinate>) : boolean {
    for (let [row,col] of coords) {
      if (row<0 || row>this.height || col<0 || col>this.width) {
        return true;
      }
    }
    return false;
  }

  private isCollision(coords: Array<coordinate>) : boolean {
    for (let [row,col] of coords) {
      if (this.matrix[row][col] != TetriminoId.None) return true;
    }
    return false;
  }

  private writeNewPosition(newcoords : Array<coordinate>) {
    for (let [row,col] of this.currCoords) {
      this.matrix[row][col] = TetriminoId.None;
    }
    for (let [row,col] of newcoords) {
      this.matrix[row][col] = this.activeMino.id;
    }
    this.currCoords = newcoords;
  }

  public spawnTetrimino(type:TetriminoId) : Array<Array<TetriminoId>> {
    this.activeMino = new Tetrimino(type);
    //todo
    return this.matrix;
  }

  public fall() : Array<Array<TetriminoId>> {
    let newcoords = this.activeMino.moveDown();
    if (this.isCollision(newcoords) || this.isOutOfBounds(newcoords)) {
      newcoords = this.activeMino.moveUp();
      this.activeMino.landed = true;
    } else {
      this.writeNewPosition(newcoords);
    }
    return this.matrix;
  }

  public harddrop() : Array<Array<TetriminoId>> {
    let newcoords = this.currCoords;
    while (this.activeMino.landed != true) {
      newcoords = this.activeMino.moveDown();
      if (this.isCollision(newcoords) || this.isOutOfBounds(newcoords)) {
        this.activeMino.moveUp();
        this.activeMino.landed = true;
        break;
      }
    }
    this.writeNewPosition(newcoords);
    return this.matrix;
  }

  public softdrop() : Array<Array<TetriminoId>> {
    let newcoords = this.activeMino.moveDown();
    if (this.isCollision(newcoords) || this.isOutOfBounds(newcoords)) {
      this.activeMino.moveUp();
    } else {
      this.writeNewPosition(newcoords);
    }
    return this.matrix;
  }

  public rotateLeft() : Array<Array<TetriminoId>> {
    //todo
    return this.matrix;
  }

  public rotateRight() : Array<Array<TetriminoId>> {
    //todo
    return this.matrix;
  }

  public moveLeft() : Array<Array<TetriminoId>> {
    let newcoords = this.activeMino.moveLeft();
    if (this.isCollision(newcoords) || this.isOutOfBounds(newcoords)) {
      this.activeMino.moveRight();
    } else {
      this.writeNewPosition(newcoords);
    }
    return this.matrix;
  }

  public moveRight() : Array<Array<TetriminoId>> {
    let newcoords = this.activeMino.moveRight();
    if (this.isCollision(newcoords) || this.isOutOfBounds(newcoords)) {
      this.activeMino.moveLeft();
    } else {
      this.writeNewPosition(newcoords);
    }
    return this.matrix;
  }

}
