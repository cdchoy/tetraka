// server/Grid2d.ts

import {Tetrimino, TetriminoId} from "../Modules"

export type coordinate = [number, number];  // row,col

export class Grid {
  readonly height : number;
  readonly width : number;

  private origin : coordinate;
  private currPosition : Array<coordinate>;
  private lineOccupancy : Array<number>;
  private completeLines : Array<number>;

  public activeMino : Tetrimino;
  public matrix : Array<Array<TetriminoId>>;

  constructor(height:number = 10, width:number = 21) {
    this.height = height;
    this.width = width;
    this.origin = [0,0];
    this.currPosition = new Array<coordinate>();
    this.lineOccupancy = new Array<number>();
    this.completeLines = new Array<number>();
    this.activeMino = new Tetrimino(TetriminoId.None);
    this.matrix = new Array<Array<TetriminoId>>();

    // Initiate lineOccupancy and matrix
    for (let row = 0; row < height; row++) {
      this.lineOccupancy.push(0);
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
  private isLegalMove(coords: Array<coordinate>) : boolean {
    for (let [row,col] of coords) {
      if (row < 0 || row > this.height || col < 0 || col > this.width) return false;  // OutOfBounds
      if (this.matrix[row][col] != TetriminoId.None) return false;  // OccupiedCoordinate
    }
    return true;
  }

  /**
   * Erases old position on the grid and writes in the new ones
   * @param newPosition
   */
  private updatePosition(newOrigin: coordinate, newPosition : Array<coordinate>) {
    for (let [row,col] of this.currPosition) {
      this.matrix[row][col] = TetriminoId.None;
    }
    for (let [row,col] of newPosition) {
      this.matrix[row][col] = this.activeMino.id;
    }
    this.currPosition = newPosition;
    this.origin = newOrigin;
  }

  /**
   * Land the tetrimino and update grid metadata
   */
  private land() : void {
    this.activeMino.landed = true;
    for (let [row,col] of this.currPosition) {
      this.lineOccupancy[row] += 1;
      if (this.lineOccupancy[row] == this.width) {
        this.completeLines.push(row);
      }
    }
  }

  /**
   * Writes in new tetrimino to grid
   */
  public spawnTetrimino(type:TetriminoId) : void {
    this.activeMino = new Tetrimino(type);
    this.origin = [(this.height - 1), Math.floor(this.width/2) - 2];
    this.currPosition = this.activeMino.getCoordinates(this.origin);
    // TODO: if spawn position is illegal --> KO
    this.updatePosition(this.origin, this.currPosition);
  }

  /**
   * Deletes the current active tetrimino from the grid
   */
  public deleteTetrimino() : void {
    for (let [row,col] of this.currPosition) {
      this.matrix[row][col] = TetriminoId.None;
    }
  }

  /**
   * Clear complete lines from the grid and shift all above rows down
   */
  public clearCompleteLines() : number {
    const linesCleared = this.completeLines.length;
    this.completeLines.sort((n1,n2) => n1-n2); // sort array small to large

    for (let row = this.completeLines[0]; row < this.height; row++) {
      let targetRow = row + linesCleared;
      if (targetRow < this.height) {
        this.lineOccupancy[row] = this.lineOccupancy[targetRow];
        this.matrix[row] = this.matrix[targetRow];
      }
      else {
        this.lineOccupancy[row] = 0;
        for (let col in this.matrix[row]) {  // empty row
          this.matrix[row][col] = TetriminoId.None;
        }
      }
    }

    // clean metadata
    this.completeLines = [];
    return linesCleared;
  }

  /**
   * Add garbage lines to bottom of grid
   * @param lines
   */
  public addGarbage(lines:number) {
    // TODO
  }

  /**
   * Triggers every couple of frames as determined by fall speed
   * Increments the tetrimino down 1 if possible. If not, it lands the tetrimino.
   */
  public fall() : void {
    const newOrigin: coordinate = [this.origin[0]-1, this.origin[1]];
    const newPosition = this.activeMino.getCoordinates(newOrigin);

    if (this.isLegalMove(newPosition))
      this.updatePosition(newOrigin, newPosition);
    else
      this.land();
  }

  /**
   * Triggers on hard drop input.
   * Drops tetrimino until it lands. TODO: allow slight movement before locking?
   */
  public harddrop() : void {
    while (!this.activeMino.landed) {
      this.fall();
    }
  }

  /**
   * Triggers on move {left,right,down} input.
   * Moves the tetrimino if possible. Does not set it in landed.
   */
  public move(direction: string) : void {
    let newOrigin: coordinate;
    switch (direction) {
      case "down":
        newOrigin = [this.origin[0]-1, this.origin[1]]; // soft drop
        break;
      case "left":
        newOrigin = [this.origin[0], this.origin[1]-1]; // move left
        break;
      case "right":
        newOrigin = [this.origin[0], this.origin[1]+1]; // move right
        break;
      default:
        throw new Error("Unknown movement for move(): " + direction)
    }

    const newPosition = this.activeMino.getCoordinates(newOrigin);

    if (this.isLegalMove(newPosition))
      this.updatePosition(newOrigin, newPosition);
  }

  /**
   * Triggers on rotate right input.
   * Rotates the piece clockwise. Handles rotations into illegal space.
   * Uses the "Super Rotation System" to handle these cases.
   */
  public rotate(direction: string) : void {
    let newPosition = (direction == "left") ? this.activeMino.rotateLeft(this.origin) : this.activeMino.rotateRight(this.origin);

    // Try basic rotation
    if (this.isLegalMove(newPosition)) {
      this.updatePosition(this.origin, newPosition);
      return;
    }

    // Trying to rotate into illegal space. Try kicking the piece
    for (let offset = 2; offset <= 5; offset++) {
      let newOrigin = this.activeMino.kickOrigin(this.origin, offset);
      newPosition = this.activeMino.getCoordinates(newOrigin);
      if (this.isLegalMove(newPosition)) {
        this.updatePosition(newOrigin, newPosition);
        return;
      }
    }

    // No possible rotation iterations even with kicking.
    // Undo Form change and don't change the matrix
    (direction == "left") ? this.activeMino.rotateRight(this.origin) : this.activeMino.rotateLeft(this.origin);
  }
}