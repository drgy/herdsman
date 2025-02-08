/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ANIMAL_MAX_SPEED: number;
	readonly VITE_ANIMAL_MAX_REST: number;
	readonly VITE_ANIMAL_MAX_COUNT_FREE: number;
	readonly VITE_ANIMAL_RESPAWN_INTERVAL: number;
	readonly VITE_ANIMATION_DURATION: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv; 
}
