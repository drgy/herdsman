import {Texture, TilingSprite} from "pixi.js";
import {Game} from "../Game.ts";

export class Background extends TilingSprite {
	constructor() {
		super({ texture: Texture.from('grass'), width: Game.width, height: Game.height });

		Game.on_resize(() => this.update());
	}

	public update() {
		super.width = Game.width;
		super.height = Game.height;
	}
}