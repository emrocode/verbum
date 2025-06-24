import { getCurrentPopper, setCurrentPopper } from "./popperState";
import type { VerbumSettings, VerbumPopper } from "src/types";

export function showVerbumPopper(opt: VerbumPopper, settings: VerbumSettings) {
  const current = getCurrentPopper();
  if (current) current.remove();

  const rect = opt.target.getBoundingClientRect();
  const popper = document.createElement("div");
  popper.dataset.verbum = opt.word;
  popper.className = "verbum";

  const showOrigin = settings.showOrigin && opt.definition.origin;
  const rawOrigin = showOrigin ? `[[${opt.definition.origin}]]` : "";
  const rawText = opt.definition.text;
  const raw = `${rawOrigin}${rawText}`;
  popper.textContent = raw;

  popper.innerHTML = popper.innerHTML.replace(
    /\[\[(.*?)\]\]/g,
    `<span class="verbum-origin">$1</span>`,
  );

  document.body.appendChild(popper);

  requestAnimationFrame(() => {
    const popperWidth = popper.offsetWidth;
    let left = rect.left + rect.width / 2 - popperWidth / 2;
    const maxLeft = window.innerWidth - popperWidth - 8;

    if (left < 8) left = 8;
    if (left > maxLeft) left = maxLeft;

    popper.style.left = `${left}px`;
    popper.style.top = `${rect.bottom + 8}px`;
    popper.style.opacity = "1";
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
