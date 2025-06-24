import { type VerbumSettings } from "src/types";

export const DEFAULT_SETTINGS: VerbumSettings = { showOrigin: true };
export const FALLBACK_TEXT: string = "Palabra no encontrada.";
export const CACHE_KEY: string = "verbum-definitions";
export const CACHE_EXPIRY_HOURS: number = 24;
