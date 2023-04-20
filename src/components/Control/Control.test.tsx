import { screen, render, renderHook, waitFor } from "@testing-library/react";
import { useControl } from "hooks";
import { Control } from "./Control";

describe("Control component", () => {
  const subscriber = jest.fn();

  afterEach(() => subscriber.mockClear());

  it("show content from render function", () => {
    const { result } = renderHook(() => useControl(1));

    render(
      <Control
        control={result.current}
        render={(val) => <h2>Current value: {val}</h2>}
      />
    );

    expect(screen.getByText("Current value: 1")).toBeInTheDocument();
  });

  it("update Control when set a new value", () => {
    const { result } = renderHook(() => useControl(1));

    render(
      <Control
        control={result.current}
        render={(val) => <h2>Current value: {val}</h2>}
      />
    );

    waitFor(() =>
      expect(result.current.events).toEqual([expect.any(Function)])
    );

    result.current.set(2);

    waitFor(() =>
      expect(screen.getByText("Current value: 2")).toBeInTheDocument()
    );
  });
  it("delete subscriber when Control unmounts", () => {
    const { result } = renderHook(() => useControl(1));

    const { unmount } = render(
      <Control
        control={result.current}
        render={(val) => <h2>Current value: {val}</h2>}
      />
    );

    waitFor(() =>
      expect(result.current.events).toEqual([expect.any(Function)])
    );

    unmount();

    waitFor(() => expect(result.current.events).toEqual([]));
  });
});
