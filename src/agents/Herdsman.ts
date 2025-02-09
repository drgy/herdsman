import {Agent} from "./Agent.ts";
import {Game} from "../Game.ts";
import {Texture, Ticker} from "pixi.js";

export class Herdsman extends Agent {
	constructor() {
		super(Texture.from('farmer'));

		this.speed = import.meta.env.VITE_HERDSMAN_MAX_SPEED;
		this.position = this.random_point;

		Game.field.on('click', e => this.target = e.global);
	}

	public update(delta: Ticker) {
		super.update(delta);

		if (this.overlaps(Game.barn)) {
			Game.manager.animal.deliver();
		}
	}
}