import { getCurrentPopper, setCurrentPopper } from "./popperState";
import type { VerbumSettings, VerbumPopper } from "src/types";

export function showVerbumPopper(opt: VerbumPopper, settings: VerbumSettings) {
  const current = getCurrentPopper();
  if (current) current.remove();

  const rect = opt.target.getBoundingClientRect();
  const popper = document.body.createEl("div", {
    cls: "verbum",
    attr: { "data-verbum": opt.word },
  });

  const showOrigin = settings.showOrigin && opt.definition.origin;
  const rawOrigin = showOrigin ? `[[${opt.definition.origin}]]` : "";
  const rawText = opt.definition.text;
  const raw = `${rawOrigin}${rawText}`;

  const regex = /\[\[(.*?)\]\]/g;

  let idx = 0;
  let match;

  while ((match = regex.exec(raw)) !== null) {
    const text = raw.slice(idx, match.index);

    if (text) popper.createEl("span", { text });

    popper.createEl("span", {
      text: match[1],
      cls: "verbum-origin",
    });

    idx = regex.lastIndex;
  }

  const remainingText = raw.slice(idx);

  if (remainingText) popper.createEl("span", { text: remainingText });

  requestAnimationFrame(() => {
    const popperWidth = popper.offsetWidth;
    let left = rect.left + rect.width / 2 - popperWidth / 2;
    const maxLeft = window.innerWidth - popperWidth - 8;

    if (left < 8) left = 8;
    if (left > maxLeft) left = maxLeft;

    popper.style.setProperty("--verbum-left", `${left}px`);
    popper.style.setProperty("--verbum-top", `${rect.bottom + 8}px`);
    popper.classList.add("visible");
  });

  setCurrentPopper(popper);

  const remove = () => {
    if (popper) popper.remove();
    setCurrentPopper(null);
    opt.target.removeEventListener("mouseleave", remove);
  };
  opt.target.addEventListener("mouseleave", remove);

  return () => {
    popper.remove();
  };
}
