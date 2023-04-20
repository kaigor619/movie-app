import { useRef } from "react";

export interface ControlType<S> {
  value: S;
  set: (newValue: S) => void;
  get: () => S;
  events: ((newValue: S) => void)[];
  subscribe: (fn: (newValue: S) => unknown) => () => void;
}

export const useControl = <S extends unknown>(initialData: S) => {
  const control: ControlType<S> = {
    value: initialData,
    set: (newValue) => {
      control.value = newValue;
      control.events.forEach((x) => {
        x(newValue);
      });
    },
    events: [],
    subscribe(fn) {
      this.events.push(fn);

      return () => {
        this.events = this.events.filter((eventFn) => fn !== eventFn);
      };
    },
    get: () => control.value,
  };

  const ref = useRef(control);

  return ref.current;
};
