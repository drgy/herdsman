import {Sprite, Texture} from "pixi.js";

export class Barn extends Sprite {
	constructor() {
		super(Texture.from('barn'));
	}
}