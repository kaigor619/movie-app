import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { InputController, InputFileController } from "components/Input";
import { MovieApi } from "api/movieApi";
import styles from "./AddNewMovie.module.scss";

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
  onClose: () => void;
}

type MutationData = Parameters<typeof MovieApi.addFavoriteMovie>[0];

export const AddNewMovie: React.FC<Props> = ({ onClose }) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation<void, Error, MutationData>(
    MovieApi.addFavoriteMovie,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favorites");
        onClose();
      },
    }
  );

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

  const onSubmit = (values: FormValues) => {
    if (!values.file) return;

    const data: MutationData = {
      title: values.title,
      rating: values.rating ? +values.rating : 0,
      file: values.file,
      genres: values.genres.split(", "),
    };

    mutate(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
