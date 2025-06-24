export let currentPopper: HTMLDivElement | null = null;

export const setCurrentPopper = (popper: HTMLDivElement | null) => {
  currentPopper = popper;
};

export const getCurrentPopper = () => {
  return currentPopper;
};
