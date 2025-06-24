import { Plugin } from "obsidian";
import { SettingsTab } from "./ui/settings/settingsTab";
import { WordDefinitionManager } from "./apiManager";
import { showVerbumPopper } from "./ui/verbum/popper";
import { DEFAULT_SETTINGS } from "./_constants";
import { type VerbumSettings } from "./types";

export default class VerbumPlugin extends Plugin {
  settings: VerbumSettings;
  wordManager: WordDefinitionManager;
  private cleanupFunctions: (() => void)[] = [];

  async onload() {
    this.wordManager = new WordDefinitionManager(this);
    await this.loadSettings();

    this.registerMarkdownPostProcessor(async (doc, _ctx) => {
      const marks = doc.findAll("mark");
      const words: string[] = [];

      marks.forEach((mark: HTMLElement) => {
        const word = mark.textContent?.trim();
        if (!word || /\s/.test(word)) return;

        // save all words to prefetch definitions
        words.push(word);
        let destroyPopper: (() => void) | null = null;

        mark.addEventListener("mouseover", async () => {
          if (destroyPopper) destroyPopper;
          const definition = await this.wordManager.getWordDefinition(word);
          destroyPopper = showVerbumPopper(
            { target: mark, word, definition },
            this.settings,
          );

          this.cleanupFunctions.push(destroyPopper);
        });
      });

      await this.wordManager.prefetchDefinitions(words);
    });

    this.addSettingTab(new SettingsTab(this.app, this));
  }

  onunload(): void {
    this.cleanupFunctions.forEach((fn) => fn());
    this.cleanupFunctions = [];
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
