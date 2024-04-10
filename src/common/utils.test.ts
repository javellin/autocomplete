import { JSDOM } from "jsdom";
import {
  AutocompleteConfig,
  debounce,
  deriveOptionsBasedOnConfig,
  highlightWords,
} from "./utils";

// Mock setTimeout
jest.useFakeTimers();

describe("debounce", () => {
  it("should debounce function calls", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction);

    // Call the debounced function multiple times
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    // Advance timers by 500ms
    jest.advanceTimersByTime(500);

    // Expect the function to be called only once, after the debounce period
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});

// Mock data for testing
const mockData = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];

// Mock fetchData function for testing
const mockFetchData = async (search: string) => {
  return mockData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
};

describe("deriveOptionsBasedOnConfig function", () => {
  // Test case when data is provided directly
  it("should filter data based on provided words", async () => {
    const config: AutocompleteConfig<{ id: number; name: string }> = {
      identifier: "id",
      displayField: "name",
      data: mockData,
    };

    const options = await deriveOptionsBasedOnConfig(config, "John");
    expect(options).toEqual([
      { id: 1, name: "John Doe" },
      { id: 3, name: "Alice Johnson" },
    ]);
  });

  // Test case when fetchData function is provided
  it("should fetch data based on provided words", async () => {
    const config: AutocompleteConfig<{ id: number; name: string }> = {
      identifier: "id",
      displayField: "name",
      fetchData: mockFetchData,
    };

    const options = await deriveOptionsBasedOnConfig(config, "Smith");
    expect(options).toEqual([{ id: 2, name: "Jane Smith" }]);
  });

  // Test case when no data or fetchData is provided
  it("should return an empty array when no data or fetchData is provided", async () => {
    const config: AutocompleteConfig<{ id: number; name: string }> = {
      identifier: "id",
      displayField: "name",
    };

    const options = await deriveOptionsBasedOnConfig(config, "test");
    expect(options).toEqual([]);
  });
});

describe("highlightWords function", () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    // Set up JSDOM
    dom = new JSDOM(`
      <ul>
        <li>This is a test sentence.</li>
        <li>Another test sentence here.</li>
        <li>Test sentences are important.</li>
      </ul>
    `);
    document = dom.window.document;
    global.document = document;
  });

  test("it should highlight matching words within list items", () => {
    // Call the function with a word to highlight
    highlightWords("test");

    // Check if the words are highlighted correctly
    const listItems = document.querySelectorAll("li");
    listItems.forEach((item) => {
      expect(item.innerHTML).toContain("<b>test</b>"); // Check if the word "test" is wrapped in <b> tags
    });
  });

  test("it should handle case-insensitive matching", () => {
    // Call the function with a word to highlight
    highlightWords("TEST");

    // Check if the words are highlighted correctly regardless of case
    const listItems = document.querySelectorAll("li");
    listItems.forEach((item) => {
      expect(item.innerHTML).toContain("<b>TEST</b>"); // Check if the word "TEST" is wrapped in <b> tags
    });
  });

  test("it should handle multiple occurrences of the word", () => {
    // Call the function with a word to highlight
    highlightWords("sentence");

    // Check if all occurrences of the word are highlighted
    const listItems = document.querySelectorAll("li");
    listItems.forEach((item) => {
      expect(item.innerHTML).toContain("<b>sentence</b>"); // Check if the word "sentence" is wrapped in <b> tags
    });
  });

  test("it should not modify non-matching words", () => {
    // Call the function with a word to highlight
    highlightWords("example");

    // Check if non-matching words are not modified
    const listItems = document.querySelectorAll("li");
    listItems.forEach((item) => {
      expect(item.innerHTML).not.toContain("<b>example</b>"); // Check if the word "example" is not present
    });
  });
});
