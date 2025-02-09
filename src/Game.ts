import {Application, Assets, Container, Ticker} from "pixi.js";
import {Background} from "./environment/Background.ts";
import {AnimalManager} from "./managers/AnimalManager.ts";
import {Herdsman} from "./agents/Herdsman.ts";
import {Barn} from "./environment/Barn.ts";
import {ScoreManager} from "./managers/ScoreManager.ts";

export class Game extends Application {
	protected static instance = new Game();
	protected environment = new Container();
	protected agents = new Container();
	protected resize_callbacks: (() => void)[] = [];
	protected background: Background | null = null;
	protected herdsman: Herdsman | null = null;
	protected drop_off: Barn | null = null;
	protected managers = {
		animal: new AnimalManager(),
		score: new ScoreManager()
	};

	protected constructor() {
		super();
	}

	public static get manager(): typeof Game.instance.managers {
		return Game.instance.managers;
	}

	public static get barn(): Barn {
		return Game.instance.drop_off!;
	}

	public static get player(): Herdsman {
		return Game.instance.herdsman!;
	}

	public static get field(): Background {
		return Game.instance.background!;
	}

	public static get agents_container(): Container {
		return Game.instance.agents;
	}

	public static get ticker(): Ticker {
		return Game.instance.ticker;
	}

	public static get width(): number {
		return Game.instance.screen.width;
	}

	public static get height(): number {
		return Game.instance.screen.height;
	}

	public static on_resize(callback: () => void) {
		Game.instance.resize_callbacks.push(callback);
	}

	public static async load(target: HTMLElement = document.body) {
		await Game.instance.init({ resizeTo: target });
		target.appendChild(Game.instance.canvas);

		await Assets.init({ manifest: '/manifest.json' });

		Game.instance.stage.addChild(Game.instance.environment);
		Game.instance.stage.addChild(Game.instance.agents);

		Game.instance.managers.score.load(target);

		await Game.setup_environment();
		await Game.setup_agents();

		const resize_observer = new ResizeObserver(() => {
			for (const callback of Game.instance.resize_callbacks) {
				callback();
			}
		});
		resize_observer.observe(target);
	}

	protected static async setup_environment() {
		await Assets.loadBundle('environment');

		Game.instance.background = new Background();
		Game.instance.environment.addChild(Game.instance.background);

		Game.instance.drop_off = new Barn();
		Game.instance.environment.addChild(Game.instance.drop_off);
	}

	protected static async setup_agents() {
		await Assets.loadBundle('agents');

		Game.instance.herdsman = new Herdsman();
		Game.instance.agents.addChild(Game.instance.herdsman);

		Game.instance.managers.animal.spawn();
	}
}