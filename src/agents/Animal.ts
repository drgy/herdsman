import {Agent} from "./Agent.ts";
import {Container, Ticker} from "pixi.js";
import {Game} from "../Game.ts";

const ANIMALS = ['chicken', 'cow', 'llama', 'pig', 'sheep'];

export class Animal extends Agent {
	protected rest_time = Math.random() * import.meta.env.VITE_ANIMAL_MAX_REST * 100;
	protected hooked = false;

	constructor() {
		super(ANIMALS[Math.floor(Math.random() * ANIMALS.length)]);

		this.speed = import.meta.env.VITE_ANIMAL_MAX_SPEED;
		this.position = this.random_point;
	}

	public follow(target: Container) {
		this.rest_time = 0;
		this.target = target;
	}

	public update(delta: Ticker) {
		if (this.hooked) {
			super.update(delta);
			return;
		}

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

		if (!this.hooked && this.distance(Game.player) <= import.meta.env.VITE_PROXIMITY_DISTANCE) {
			this.hooked = Game.manager.animal.hook(this);

			if (this.hooked) {
				this.speed = import.meta.env.VITE_HERDSMAN_MAX_SPEED;
				this.animate_scale(1.5).then(() => this.animate_scale(1));
			}
		}
	}
}