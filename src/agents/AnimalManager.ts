import {Animal} from "./Animal.ts";
import {Game} from "../Game.ts";

export class AnimalManager {
	protected free_animals = 0;
	protected next_spawn = -1;

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
}