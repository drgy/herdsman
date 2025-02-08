import {Point, Sprite, Texture, Ticker} from "pixi.js";
import {Game} from "../Game.ts";

export class Agent extends Sprite {
	protected target: Point | null = null;
	protected speed = 2;

	constructor(alias: string) {
		super(Texture.from(alias));

		this.anchor.set(0.5, 0.5);
		this.scale.set(0, 0);
		this.animate_scale(1.25).then(() => this.animate_scale(1));

		Game.on_update((delta: Ticker) => this.update(delta));
	}

	protected get random_point(): Point {
		return new Point(Math.random() * (Game.width - this.width) + (this.width / 2), Math.random() * (Game.height - this.height) + (this.height / 2));
	}

	public async animate_scale(target_scale: number): Promise<void> {
		return new Promise<void>(resolve => {
			const initial_scale = this.scale.x;
			let elapsed_ms = 0;

			const update = (delta: Ticker) => {
				elapsed_ms += delta.elapsedMS;

				const progress = Math.min(elapsed_ms / import.meta.env.VITE_ANIMATION_DURATION, 1);
				const ease = 1 - (1 - progress) ** 3;
				const current = initial_scale + (target_scale - initial_scale) * ease;

				this.scale.set(current, current);

				if (progress >= 1) {
					this.scale.set(target_scale, target_scale);
					Game.ticker.remove(update);
					resolve();
				}
			};

			Game.ticker.add(update);
		});
	}

	public update(delta: Ticker) {
		if (this.target) {
			const dx = this.target.x - this.x;
			const dy = this.target.y - this.y;
			const distance = Math.sqrt(dx ** 2 + dy ** 2);

			if (distance > this.speed) {
				this.x += (dx / distance) * this.speed * delta.deltaTime;
				this.y += (dy / distance) * this.speed * delta.deltaTime;
			} else {
				this.target = null;
			}
		}
	}
}