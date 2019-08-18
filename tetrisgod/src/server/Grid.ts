// server/Grid2d.ts

import { Pixel, Tetrimino } from "../Modules";

export class Grid {
	private height : number = 10;
	private width : number = 20;
    private grid : Array<Array<Pixel>>;

	constructor(height:number, width:number) {
		this.height = height;
		this.width = width;

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
				matrixRow.push(px.tetriminoValue);
			}
			matrix.push(matrixRow);
		}

		return matrix;
	}

	public spawnTetrimino(type:Tetrimino) {

	}

	public rotateLeft() : Array<Array<number>> {
		return this.getNumMatrix();
	}
}
