// server/Grid2d.ts

import { TetriminoValue } from "../Modules"
import { Tetrimino, NoneBlock, JBlock, LBlock, ZBlock, SBlock, IBlock, TBlock, OBlock } from "../Modules"

export type coordinates = [number, number];

export class Grid {
	private height : number;
	private width : number;
  public matrix : Array<Array<TetriminoValue>>;

	constructor(height:number = 10, width:number = 21) {
		this.height = height;
		this.width = width;

    this.matrix = new Array<Array<TetriminoValue>>();
    for (let row = 0; row < height; row++) {
			let newRow = new Array<number>();
			for (let col = 0; col < width; col++) {
				newRow.push(TetriminoValue.None);
			}
			this.matrix.push(newRow);
		}
  }

  private checkInBounds(coords:coordinates) : boolean {
    const x = coords[0];
    const y = coords[1];
    if (x<0 || x>this.width) return false;
    if (y<0 || y>this.height) return false;
    return true;
  }

	public spawnTetrimino(type:Tetrimino) : Array<Array<TetriminoValue>> {
    return this.matrix;
  }

  public fall() : Array<Array<TetriminoValue>> {
    return this.matrix;
  }

  public harddrop() : Array<Array<TetriminoValue>> {
    return this.matrix;
  }

	public rotateLeft() : Array<Array<TetriminoValue>> {
		return this.matrix;
	}

  public rotateRight() : Array<Array<TetriminoValue>> {
		return this.matrix;
	}

  public moveLeft() : Array<Array<TetriminoValue>> {
    return this.matrix;
  }

  public moveRight() : Array<Array<TetriminoValue>> {
    return this.matrix;
  }


}
