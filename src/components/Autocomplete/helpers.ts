import { AutocompleteConfig } from "./types";

export const highlightWords = (searchText: string): void => {
  const items = document.querySelectorAll("li");
  const regex = new RegExp(searchText, "gi");
  items.forEach((item) => {
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
