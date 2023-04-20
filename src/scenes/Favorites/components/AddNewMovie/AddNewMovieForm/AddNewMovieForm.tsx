import { useForm } from "react-hook-form";
import { InputController, InputFileController } from "components/Input";
import styles from "./AddNewMovieForm.module.scss";

interface FormValues {
  title: string;
  genres: string;
  rating: string;
  file: null | File;
}

const rules: FormRules<FormValues> = {
  title: {
    required: "Required",
  },
  genres: {
    required: "Required",
  },
  rating: {
    required: "Required",
  },
  file: {
    required: "Required",
  },
};

interface Props {
  isLoading: boolean;
  onSubmit: (data: SubmittedValues) => void;
}

interface SubmittedValues {
  title: string;
  genres: string[];
  file: File;
  rating: number;
}

export const AddNewMovieForm: React.FC<Props> = ({ isLoading, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      genres: "",
      rating: "",
      file: null,
    },
  });

  const onSubmitForm = (values: FormValues) => {
    if (!values.file) return;

    const data: SubmittedValues = {
      title: values.title,
      rating: +values.rating,
      file: values.file,
      genres: values.genres.split(", "),
    };

    onSubmit(data);
  };

  return (
    <form
      name="add-new-movie"
      className={styles.form}
      data-testid="add-new-movie"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <h3>Add Movie</h3>

      <InputController
        rules={rules.title}
        control={control}
        name="title"
        label="Title"
      />

      <InputController
        rules={rules.genres}
        control={control}
        name="genres"
        label="Genres"
      />

      <InputController
        rules={rules.rating}
        control={control}
        name="rating"
        label="Rating"
        type="number"
      />

      <InputFileController rules={rules.file} control={control} name="file" />

      <button disabled={!isValid} type="submit" className={styles.btnSubmit}>
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};
