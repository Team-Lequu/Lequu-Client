import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { QUERY_KEY } from '../../constants/queryKeys';
import postFavorite from '../api/postFavorite';

const usePostFavorite = (location: string, bookUuid?: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleRefetchQueries = (location: string, bookUuid?: string) => {
    switch (location) {
      case 'lecueBook':
        queryClient.refetchQueries(QUERY_KEY.favorite.atLecueBook, {
          exact: true,
        });
        break;

      case 'lecueBookDetail':
        queryClient.refetchQueries(
          [QUERY_KEY.favorite.atLecueBookDetail, bookUuid],
          {
            exact: true,
          },
        );
        break;
    }
  };

  const mutation = useMutation({
    mutationFn: (bookId: number) => {
      return postFavorite(bookId);
    },
    onError: () => navigate('/error'),
    onSuccess: () => {
      handleRefetchQueries(location, bookUuid);
    },
  });
  return {
    postFavoriteMutation: mutation.mutate,
    isPostLoading: mutation.isLoading,
  };
};

export default usePostFavorite;
