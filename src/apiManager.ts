import { moment, requestUrl, type RequestUrlResponse, Notice } from "obsidian";
import { CACHE_KEY, CACHE_EXPIRY_HOURS, FALLBACK_TEXT } from "./_constants";
import type VerbumPlugin from "src/main";
import type { Definition, WordDefinitionCache, WordList } from "./types";

export class WordDefinitionManager {
  private plugin: VerbumPlugin;

  constructor(plugin: VerbumPlugin) {
    this.plugin = plugin;
  }

  /**
   * Loads and parses the word definition cache from local storage.
   *
   * @returns The current {@link WordDefinitionCache} from storage
   */
  private getCache(): Record<string, WordDefinitionCache> {
    return this.plugin.app.loadLocalStorage(CACHE_KEY) || {};
  }

  /**
   * Saves the current word definitions cache to local storage.
   *
   * @param cache - The current state of the word definition cache to be saved
   */
  private saveCache(cache: Record<string, WordDefinitionCache>) {
    this.plugin.app.saveLocalStorage(CACHE_KEY, cache);
  }

  /**
   * Determines whether a cached definition timestamp is still valid.
   *
   * @param timestamp - An ISO 8601 timestamp string to validate
   * @returns True if the timestamp is still valid, false if expired
   */
  private isCacheValid(timestamp: string): boolean {
    return moment().diff(moment(timestamp), "hours") < CACHE_EXPIRY_HOURS;
  }

  /**
   * Fetches the definition of a given word.
   *
   * @param word - The word to be defined (must be a single word, no whitespace)
   * @returns A Promise resolving to a {@link Definition} object containing the word's meaning and optional origin
   */
  async getWordDefinition(word: string): Promise<Definition> {
    const cache = this.getCache();
    const entry = cache[word];

    // Return cached definition if available and still valid
    if (entry && this.isCacheValid(entry.timestamp)) return entry.definition;

    const url = `https://verbum-x.vercel.app/w/${encodeURIComponent(word)}`;

    try {
      const res: RequestUrlResponse = await requestUrl({ url, method: "GET" });

      if (res.status !== 200) return { text: FALLBACK_TEXT };

      const data = res.json;
      cache[word] = { definition: data, timestamp: moment().toISOString() };
      this.saveCache(cache);

      return data;
    } catch (error) {
      console.error(`Failed to fetch definition for "${word}":`, error);
      return { text: FALLBACK_TEXT };
    }
  }

  /**
   * Prefetches and caches definitions for a list of words.
   *
   * @param words - A {@link WordList} containing words to prefetch and cache
   * @returns A Promise that resolves when all eligible words have been prefetched and stored
   */
  async prefetchDefinitions(words: WordList): Promise<void> {
    const cache = this.getCache();
    const now = moment();

    const uniqueWords = [
      ...new Set(words.map((word) => word.trim().toLowerCase())),
    ];

    const fetchPromises = uniqueWords.map(async (word) => {
      const entry = cache[word];
      if (entry && this.isCacheValid(entry.timestamp)) return;

      const definition = await this.getWordDefinition(word);
      cache[word] = { definition, timestamp: now.toISOString() };
    });

    await Promise.all(fetchPromises);
    this.saveCache(cache);
  }
}
