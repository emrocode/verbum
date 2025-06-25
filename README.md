# Verbum

A plugin for Obsidian that provides instant Spanish word definitions through tooltips when hovering over marked text in reading mode.

> This plugin is made possible thanks to [@rae-api-com](https://github.com/rae-api-com)

## Features

- **Automatic Detection:** Monitors all text marked with `<mark>` tags in your notes
- **Hover Tooltips:** Displays word definitions and senses when hovering over marked words
- **Spanish Dictionary:** Integrated with Spanish dictionary API for accurate definitions
- **Reading Mode Only:** Works exclusively in reading mode for distraction-free learning

## Usage

1. Mark any Spanish word in your notes using the `<mark>` tag:

```md
Esta es una ==palabra== que quiero buscar.
```

2. Switch to reading mode in Obsidian
3. Hover over the marked word to see its definition and different senses in a tooltip

<img src="./screenshot_light.png#gh-light-mode-only" alt="Verbum plugin in action showing tooltip with word definition" width="600" />
<img src="./screenshot_dark.png#gh-dark-mode-only" alt="Verbum plugin in action showing tooltip with word definition" width="600" />

## Installation

### Manual Installation

1. Download the latest release from the releases page
2. Extract the files to your vault's `.obsidian/plugins/verbum/` folder
3. Reload Obsidian or restart the application
4. Enable the plugin in Settings > Community Plugins

### From Community Plugins

_This plugin is not yet available in the community plugins directory_

## Requirements

- Obsidian v0.15.0 or higher
- Active internet connection for dictionary API access

## Configuration

No configuration required - the plugin works out of the box with sensible defaults.

## Limitations

- Only works in reading mode
- Requires internet connection for dictionary lookups
- Currently supports Spanish language only

## Support

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/emrocode/verbum/issues) on the GitHub repository.
