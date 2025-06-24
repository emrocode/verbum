export interface Definition {
  origin?: string;
  text: string;
}

export type WordList = string[];

export type WordDefinitionCache = {
  definition: Definition;
  timestamp: string;
};

export interface VerbumSettings {
  showOrigin: boolean;
}

export interface VerbumPopper {
  target: HTMLElement;
  word: string;
  definition: Definition;
}
