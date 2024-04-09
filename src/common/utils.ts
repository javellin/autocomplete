export interface AutocompleteConfig<T> {
  identifier: keyof T;
  displayField: keyof T;
  data?: T[] | null;
  fetchData?(search: string): Promise<T[]> | null;
}

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

export const highlightWords = (words: string): void => {
  const items = document.querySelectorAll("li");
  items.forEach((item) => {
    const regex = new RegExp(words, "gi");
    const replacement = "<b>" + words + "</b>";
    if (item.textContent) {
      item.innerHTML = item.textContent.replace(regex, replacement);
    }
  });
};

export async function deriveOptionsBasedOnConfig<T>(
  config: AutocompleteConfig<T>,
  words: string
) {
  if (config.data) {
    return config.data.filter((item) =>
      (item[config.displayField] as string)
        .toLocaleLowerCase()
        .includes(words.toLocaleLowerCase())
    );
  }

  if (config.fetchData) {
    const data = await config.fetchData(words);
    return data ?? [];
  }

  return [];
}
