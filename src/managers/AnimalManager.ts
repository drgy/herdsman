import {Animal} from "../agents/Animal.ts";
import {Game} from "../Game.ts";

export class AnimalManager {
	protected free_animals = 0;
	protected next_spawn = -1;
	protected hooked_count = 0;
	protected hooked_tail: Animal | null = null;

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
		if (this.hooked_count < import.meta.env.VITE_MAX_HOOKED_ANIMALS) {
			animal.follow(this.hooked_tail || Game.player);
			this.hooked_tail = animal;
			this.free_animals--;
			this.hooked_count++;

			return true;
		}

		return false;
	}
}