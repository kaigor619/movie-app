import { useMutation, useQueryClient } from "react-query";
import { MovieApi } from "api/movieApi";
import { AddNewMovieForm } from "./AddNewMovieForm";

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

  return <AddNewMovieForm isLoading={isLoading} onSubmit={mutate} />;
};
