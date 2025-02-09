/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ANIMAL_MAX_SPEED: number;
	readonly VITE_ANIMAL_MAX_REST: number;
	readonly VITE_ANIMAL_MAX_COUNT_FREE: number;
	readonly VITE_ANIMAL_RESPAWN_INTERVAL: number;
	readonly VITE_ANIMATION_DURATION: number;
	readonly VITE_HERDSMAN_MAX_SPEED: number;
	readonly VITE_PROXIMITY_DISTANCE: number;
	readonly VITE_MAX_HOOKED_ANIMALS: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv; 
}
