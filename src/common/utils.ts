export const debounce = (
  func: (...args: any[]) => void
): ((...args: any[]) => void) => {
  let timer: NodeJS.Timeout | null;
  return function (this: any, ...args: any[]) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};
