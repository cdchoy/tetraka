// server/Pixel.ts

import { Tetrimino } from "../Modules"

export class Pixel {
	color : string = "empty";
	tetriminoValue : Tetrimino = Tetrimino.None;
	active : boolean = false

}
