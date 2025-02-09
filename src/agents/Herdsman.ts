import {Agent} from "./Agent.ts";
import {Game} from "../Game.ts";

export class Herdsman extends Agent {
	constructor() {
		super('farmer');

		this.speed = import.meta.env.VITE_HERDSMAN_MAX_SPEED;
		this.position = this.random_point;

		Game.field.on('click', e => this.target = e.global);
	}
}