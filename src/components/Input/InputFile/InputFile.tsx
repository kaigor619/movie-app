import { IconDownload } from "@tabler/icons";
import clsx from "clsx";
import styles from "./InputFile.module.scss";

interface Props {
  name: string;
  value: File | null;
  onChange: (e: File | null) => void;
}

export const InputFile: React.FC<Props> = ({ value, name, onChange }) => {
  return (
    <>
      <label
        className={clsx(styles.inputFileLabel, {
          [styles.active]: !!value,
        })}
        htmlFor={name}
      >
        <IconDownload />
        <span>{value ? value.name : "Choose image"}</span>
      </label>

      <input
        id={name}
        type="file"
        className={styles.inputFile}
        onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
      />
    </>
  );
};
