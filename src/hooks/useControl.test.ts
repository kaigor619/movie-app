import { renderHook } from "@testing-library/react";
import { useControl } from "./useControl";

describe("useControl hook", () => {
  const subscriber = jest.fn();

  afterEach(() => subscriber.mockClear());

  it("return initial value", async () => {
    const { result } = renderHook(() => useControl(10));

    expect(result.current).toEqual({
      value: 10,
      set: expect.any(Function),
      events: [],
      subscribe: expect.any(Function),
      get: expect.any(Function),
    });
  });
  it("set new value", async () => {
    const { result } = renderHook(() => useControl(10));

    result.current.set(12);

    expect(result.current).toEqual({
      value: 12,
      set: expect.any(Function),
      events: [],
      subscribe: expect.any(Function),
      get: expect.any(Function),
    });
  });
  it("add new event via subscribe", async () => {
    const { result } = renderHook(() => useControl(10));

    result.current.subscribe(subscriber);

    expect(result.current).toEqual({
      value: 10,
      set: expect.any(Function),
      events: [subscriber],
      subscribe: expect.any(Function),
      get: expect.any(Function),
    });
  });
  it("calls handlers when the value changes", async () => {
    const { result } = renderHook(() => useControl(10));

    result.current.subscribe(subscriber);
    result.current.set(12);

    expect(subscriber).toBeCalledWith(12);
  });
  it("remove handler from events", async () => {
    const { result } = renderHook(() => useControl(10));

    const unsubscribe = result.current.subscribe(subscriber);

    unsubscribe();

    expect(result.current).toEqual({
      value: 10,
      set: expect.any(Function),
      events: [],
      subscribe: expect.any(Function),
      get: expect.any(Function),
    });
  });
  it("check get method", async () => {
    const { result } = renderHook(() => useControl(10));
    expect(result.current.get()).toBe(10);
  });
});
