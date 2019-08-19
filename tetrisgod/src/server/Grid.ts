// server/Grid2d.ts

import { Pixel } from "../Modules";
import { Tetrimino, NoneBlock, JBlock, LBlock, ZBlock, SBlock, IBlock, TBlock, OBlock } from "../Modules"

export type coordinates = [number, number];

export class Grid {
	private height : number;
	private width : number;
  private grid : Array<Array<Pixel>>;
  private activeCoords : Array<coordinates>;

	constructor(height:number = 10, width:number = 20) {
		this.height = height;
		this.width = width;
    this.activeCoords = [];

		this.grid = new Array(height);
        this.grid.forEach(function (row) {
        	row = new Array<Pixel>(width);
        });
    }

	// returns int matrix for lighter socket communication
	public getNumMatrix() : Array<Array<number>> {
		let matrix : Array<Array<number>> = new Array<Array<number>>();
		for (let row = 0; row < this.height; row++) {
			let matrixRow = new Array<number>();
			for (let col = 0; col < this.width; col++) {
				const px = this.grid[row][col];
				matrixRow.push(px.tetrimino.value);
			}
			matrix.push(matrixRow);
		}

		return matrix;
	}

	public spawnTetrimino(type:Tetrimino) {

	}

  public fall() : Array<Array<number>> {
    return this.getNumMatrix();
  }

  public harddrop() : Array<Array<number>> {
    return this.getNumMatrix();
  }

	public rotateLeft() : Array<Array<number>> {
		return this.getNumMatrix();
	}

  public rotateRight() : Array<Array<number>> {
		return this.getNumMatrix();
	}

  public moveLeft() : Array<Array<number>> {
    return this.getNumMatrix();
  }

  public moveRight() : Array<Array<number>> {
    return this.getNumMatrix();
  }


}
