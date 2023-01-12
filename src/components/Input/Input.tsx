import { observer } from "mobx-react-lite";
import clsx from "clsx";
import { themeStore } from "stores/ThemeStore";

import styles from "./Input.module.scss";

interface Props {
  name: string;
  label?: string;
  type?: "number" | "text";
  errorMessage?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<Props> = observer(
  ({ name, label, type = "text", errorMessage, onChange, onFocus, onBlur }) => {
    return (
      <>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.inputWrapper} data-theme={themeStore.theme}>
          <input
            id={name}
            name={name}
            type={type}
            className={clsx(styles.input, {
              [styles.error]: !!errorMessage,
            })}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />

          {errorMessage && (
            <span className={styles.inputError}>{errorMessage}</span>
          )}
        </div>
      </>
    );
  }
);
