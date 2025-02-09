import {Animal} from "../agents/Animal.ts";
import {Game} from "../Game.ts";

export class AnimalManager {
	protected free_animals = 0;
	protected next_spawn = -1;
	protected hooked: Animal[] = [];

	constructor() {

	}

	public spawn() {
		if (this.free_animals <= import.meta.env.VITE_ANIMAL_MAX_COUNT_FREE && this.next_spawn < 0) {
			this.next_spawn = setTimeout(() => {
				Game.agents_container.addChild(new Animal());
				this.free_animals++;
				this.next_spawn = -1;
				this.spawn();
			}, Math.random() * import.meta.env.VITE_ANIMAL_RESPAWN_INTERVAL * 1000);
		}
	}

	public hook(animal: Animal): boolean {
		if (this.hooked.length < import.meta.env.VITE_MAX_HOOKED_ANIMALS) {
			animal.follow(this.hooked.length ? this.hooked[this.hooked.length - 1] : Game.player);
			this.hooked.push(animal);
			this.free_animals--;
			this.spawn();

			return true;
		}

		return false;
	}

	public deliver() {
		if (this.hooked.length) {
			Game.manager.score.increaseScore(this.hooked.length);

			for (const animal of this.hooked) {
				animal.destroy();
			}

			this.hooked = [];
		}
	}
}