import {Agent} from "./Agent.ts";
import {Ticker} from "pixi.js";

const ANIMALS = ['chicken', 'cow', 'llama', 'pig', 'sheep'];

export class Animal extends Agent {
	protected rest_time = Math.random() * import.meta.env.VITE_ANIMAL_MAX_REST * 100;

	constructor() {
		super(ANIMALS[Math.floor(Math.random() * ANIMALS.length)]);

		this.speed = import.meta.env.VITE_ANIMAL_MAX_SPEED;
		this.position = this.random_point;
	}

	public update(delta: Ticker) {
		if (this.rest_time > 0) {
			this.rest_time -= delta.deltaTime;
		} else {
			if (!this.target) {
				this.target = this.random_point;
			}

			super.update(delta);

			if (!this.target) {
				this.rest_time = Math.random() * import.meta.env.VITE_ANIMAL_MAX_REST * 100;
			}
		}
	}
}