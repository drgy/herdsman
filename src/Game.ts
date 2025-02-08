import {Application, Assets, Container} from "pixi.js";
import {Background} from "./environment/Background.ts";

export class Game extends Application {
	protected static instance = new Game();
	protected environment = new Container();
	protected agents = new Container();
	protected resize_callbacks: (() => void)[] = [];

	protected constructor() {
		super();
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

		await Game.setup_environment();

		const resize_observer = new ResizeObserver(() => {
			for (const callback of Game.instance.resize_callbacks) {
				callback();
			}
		});
		resize_observer.observe(target);
	}

	protected static async setup_environment() {
		await Assets.loadBundle('environment');

		Game.instance.environment.addChild(new Background());
	}
}