import { App, PluginSettingTab, Setting } from "obsidian";
import type VerbumPlugin from "src/main";

export class SettingsTab extends PluginSettingTab {
  private plugin: VerbumPlugin;

  constructor(app: App, plugin: VerbumPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h1", { text: "Verbum" });
    containerEl.createEl("p", {
      text: "Accede a las opciones esenciales de Verbum.",
    });

    new Setting(containerEl)
      .setName("Mostrar origen de la palabra")
      .setDesc("Mostrar origen y etimología de la palabra marcada.")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.showOrigin)
          .onChange(async (value) => {
            this.plugin.settings.showOrigin = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("¿Encontraste un problema?")
      .setDesc("Ayúdanos a mejorar reportando errores o sugerencias.")
      .addButton((btn) =>
        btn
          .setButtonText("Abrir issue en GitHub")
          .setCta()
          .onClick(() => {
            open("https://github.com/emrocode/verbum/issues", "_blank");
          }),
      );

    new Setting(containerEl).setDesc(
      createFragment((frag) => {
        frag.appendText(
          "Este plugin es posible gracias al servicio ofrecido por ",
        );
        const link = frag.createEl("a", {
          text: "RAE API Organization",
          href: "https://github.com/rae-api-com",
        });
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        frag.appendText(".");
      }),
    );
  }
}
