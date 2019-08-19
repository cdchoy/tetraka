// server/Pixel.ts

import { Tetrimino, NoneBlock, JBlock, LBlock, ZBlock, SBlock, IBlock, TBlock, OBlock } from "../Modules"

export class Pixel {
	color : string = "empty";
	tetrimino : Tetrimino = new NoneBlock();
	active : boolean = false

}
