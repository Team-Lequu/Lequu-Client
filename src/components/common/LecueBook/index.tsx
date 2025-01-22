import { useNavigate } from 'react-router-dom';

import { IcHomeFavoriteFilled } from '../../../assets';
import useDeleteFavorite from '../../../libs/hooks/useDeleteFavorite';
import * as S from './LecueBook.style';

type bookType = 'favorite' | 'normal';
type deleteType = 'mypage' | 'home';

interface LecueBookProps {
  bookId: number;
  bookUuid: string;
  favoriteImage: string;
  favoriteName: string;
  bookType: bookType;
  deleteType?: deleteType;
}

function LecueBook(props: LecueBookProps) {
  const {
    bookId,
    bookUuid,
    favoriteImage,
    favoriteName,
    deleteType,
    bookType,
  } = props;

  const navigate = useNavigate();

  const { deleteFavoriteMutation: deleteMypageMutation } =
    useDeleteFavorite('mypage');
  const { deleteFavoriteMutation: deleteHomeMutation } =
    useDeleteFavorite('home');

  const handleClickFavoriteBtn = (
    bookId: number,
    deleteType: deleteType | undefined,
  ) => {
    deleteType === 'home'
      ? deleteHomeMutation(bookId)
      : deleteMypageMutation(bookId);
  };

  const handleClickBook = (bookUuid: string) => {
    navigate(`/lecue-book/${bookUuid}`);
  };

  return (
    <S.LecueBookWrapper>
      <S.BookImage
        src={favoriteImage}
        alt="레큐북-이미지"
        onClick={() => handleClickBook(bookUuid)}
      />
      {bookType === 'favorite' && (
        <S.FavoriteButton
          type="button"
          onClick={() => handleClickFavoriteBtn(bookId, deleteType)}
        >
          <IcHomeFavoriteFilled />
        </S.FavoriteButton>
      )}

      <S.Title>{favoriteName}</S.Title>
    </S.LecueBookWrapper>
  );
}

export default LecueBook;
