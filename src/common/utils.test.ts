import { debounce } from "./utils";

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
