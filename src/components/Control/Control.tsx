import React, { useState, useEffect } from "react";
import { ControlType } from "hooks/useControl";

interface Props<T> {
  control: ControlType<T>;
  render: (value: T) => React.ReactNode | React.ReactNode[];
}

export function Control<T>({
  control,
  render,
}: Props<T>): React.ReactElement<Props<T>> {
  const [value, setValue] = useState<T>(control.value);

  useEffect(() => {
    const unsubscribe = control.subscribe((newValue) => {
      setValue(newValue);
    });

    return unsubscribe;

    // eslint-disable-next-line
  }, []);

  return <>{render(value)}</>;
}
