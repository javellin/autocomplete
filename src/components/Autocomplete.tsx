import { useEffect, useState } from "react";
import {
  AutocompleteConfig,
  debounce,
  deriveOptionsBasedOnConfig,
  highlightWords,
} from "../common/utils";

export interface AutoCompleteProps<T> {
  config: AutocompleteConfig<T>;
  setValue(value: T): void;
}

export function Autocomplete<T>({ config, setValue }: AutoCompleteProps<T>) {
  const [options, setOptions] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleClear = () => {
    setOptions([]);
    setInputValue("");
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const words = e.target.value;

    if (!words) {
      handleClear();
      return;
    }

    const newOptions = await deriveOptionsBasedOnConfig(config, words);

    setOptions(newOptions);
    setInputValue(words);
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
    <div>
      <input onChange={debouncedHandleChange} />
      {!!options.length && (
        <ul>
          {options.map((option) => (
            <li
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
