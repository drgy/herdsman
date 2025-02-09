import {Point, Sprite, Texture, Ticker, Container, ContainerChild} from "pixi.js";
import {Game} from "../Game.ts";

export class Agent extends Sprite {
	protected target: Container | Point | null = null;
	protected speed = 2;

	constructor(alias: string) {
		super(Texture.from(alias));

		this.anchor.set(0.5, 0.5);
		this.scale.set(0, 0);
		this.animate_scale(1.25).then(() => this.animate_scale(1));

		Game.on_update((delta: Ticker) => this.update(delta));
	}

	public distance(target: Container | Point, direction = new Point()): number {
		const global = this.getGlobalPosition();

		if (target instanceof Container) {
			target.getGlobalPosition(direction);
		} else {
			direction.copyFrom(target);
		}

		direction.set(direction.x - global.x, direction.y - global.y);

		const distance = Math.sqrt(direction.x ** 2 + direction.y ** 2);

		if (distance > 0) {
			direction.x /= distance;
			direction.y /= distance;
		}

		return distance;
	}

	protected get random_point(): Point {
		return new Point(Math.random() * (Game.width - this.width) + (this.width / 2), Math.random() * (Game.height - this.height) + (this.height / 2));
	}

	public async animate_scale(target_scale: number): Promise<void> {
		return new Promise<void>(resolve => {
			const initial_scale = this.scale.x;
			let progress = 0;

			const update = (delta: Ticker) => {
				progress = Math.min(1, progress + delta.elapsedMS / import.meta.env.VITE_ANIMATION_DURATION);

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
			const direction = new Point();
			const distance = this.distance(this.target, direction);
			const step = this.speed * delta.deltaTime;

			if (this.target instanceof Container) {
				if (distance >= import.meta.env.VITE_PROXIMITY_DISTANCE) {
					this.x += direction.x * step;
					this.y += direction.y * step;
				}
			} else {
				if (distance > this.speed) {
					this.x += direction.x * step;
					this.y += direction.y * step;
				} else {
					this.target = null;
				}
			}
		}
	}
}