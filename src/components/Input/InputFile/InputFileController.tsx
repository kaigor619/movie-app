import { Controller, UseControllerProps } from "react-hook-form";

import { InputFile } from "./InputFile";

// type InputProps = React.ComponentProps<typeof InputFile>;

type Props<T extends Record<string, any>> = RequiredBy<
  UseControllerProps<T>,
  "control"
>;

export function InputFileController<T extends Record<string, any>>(
  props: Props<T>
): React.ReactElement<Props<T>> {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ field }) => (
        <InputFile
          name={props.name}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}
