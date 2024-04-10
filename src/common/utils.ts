import { AutocompleteConfig } from "../components/Autocomplete/types";

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

export const highlightWords = (searchText: string): void => {
  const items = document.querySelectorAll("li");
  items.forEach((item) => {
    const regex = new RegExp(searchText, "gi");
    const replacement = "<b>" + searchText + "</b>";
    if (item.textContent) {
      item.innerHTML = item.textContent.replace(regex, replacement);
    }
  });
};

export async function deriveOptionsBasedOnConfig<T>(
  config: AutocompleteConfig<T>,
  searchText: string
) {
  if (Array.isArray(config.data)) {
    return config.data.filter((item) =>
      (item[config.displayField] as string)
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
    );
  }

  if (config.fetchData instanceof Function) {
    const data = await config.fetchData(searchText);
    return data ?? [];
  }

  return [];
}
