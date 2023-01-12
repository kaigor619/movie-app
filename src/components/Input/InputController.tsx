import { Controller, UseControllerProps } from "react-hook-form";

import { Input } from "./Input";

type InputProps = React.ComponentProps<typeof Input>;

type Props<T extends Record<string, any>> = Omit<
  InputProps,
  "value" | "onChange" | "onBlur" | "onFocus" | "errorMessage"
> &
  RequiredBy<UseControllerProps<T>, "control">;

export function InputController<T extends Record<string, any>>(
  props: Props<T>
): React.ReactElement<Props<T>> {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ field, fieldState }) => (
        <Input
          name={props.name}
          label={props.label}
          type={props.type}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          errorMessage={fieldState?.error?.message || ""}
        />
      )}
    />
  );
}
