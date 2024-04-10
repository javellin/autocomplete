import { useEffect, useState } from "react";
import {
  debounce,
  deriveOptionsBasedOnConfig,
  highlightWords,
} from "../../common/utils";

import "./styles.css";
import { AutocompleteConfig } from "./types";

export interface AutoCompleteProps<T> {
  config: AutocompleteConfig<T>;
  setValue(value: T): void;
}

export function Autocomplete<T>({ config, setValue }: AutoCompleteProps<T>) {
  const [options, setOptions] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClear = () => {
    setOptions([]);
    setInputValue("");
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;

    if (!searchText) {
      handleClear();
      return;
    }

    try {
      setIsLoading(true);

      const newOptions = await deriveOptionsBasedOnConfig(config, searchText);

      setOptions(newOptions);
      setInputValue(searchText);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (option: T) => {
    setValue(option);
    handleClear();
  };

  useEffect(() => {
    highlightWords(inputValue);
  }, [inputValue]);

  const debouncedHandleChange = debounce(handleChange);

  return (
    <div className="autocomplete-container">
      <input className="autocomplete-input" onChange={debouncedHandleChange} />
      {isLoading && (
        <div className="autocomplete-icon-container">
          <i className="autocomplete-loader"></i>
        </div>
      )}
      {!!options.length && (
        <ul className="autocomplete-options">
          {options.map((option) => (
            <li
              className="autocomplete-options__item"
              key={option[config.identifier] as string}
              onClick={() => handleSelect(option)}
            >
              {option[config.displayField] as string}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
