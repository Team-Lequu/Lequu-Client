import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IcStar, IcStarDefault, IcWaste } from '../../../assets';
import CommonModal from '../../../components/common/Modal/CommonModal';
import useDeleteFavorite from '../../../libs/hooks/useDeleteFavorite';
import usePostFavorite from '../../../libs/hooks/usePostFavorite';
import useDeleteMyBook from '../../hooks/useDeleteMyBook';
import { LecueBookProps } from '../../types/historyType';
import * as S from './MyLecueBook.style';

function MyLecueBook(props: LecueBookProps) {
  const {
    bookId,
    favoriteName,
    title,
    bookDate,
    noteNum,
    bookUuid,
    isFavorite,
  } = props;
  const [noteCount, setNoteCount] = useState('');
  const [modalOn, setModalOn] = useState(false);

  const navigate = useNavigate();

  const deleteBookMutation = useDeleteMyBook();
  const { postFavoriteMutation: postFavoriteMutation } =
    usePostFavorite('lecueBook');
  const { deleteFavoriteMutation: deleteFavoriteMutation } =
    useDeleteFavorite('lecueBook');

  const convertNoteCount = (noteNum: number) => {
    setNoteCount(noteNum.toLocaleString());
  };

  const handleClickBook = (bookUuid: string) => {
    navigate(`/lecue-book/${bookUuid}`);
  };

  const handleClickTrashBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setModalOn(true);
    event.stopPropagation();
  };

  const handleClickFavoriteBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bookId: number,
  ) => {
    event.stopPropagation();
    isFavorite ? deleteFavoriteMutation(bookId) : postFavoriteMutation(bookId);
  };

  const handleDeleteBookFn = () => {
    deleteBookMutation(bookId);
  };

  useEffect(() => {
    convertNoteCount(noteNum);
  }, []);

  return (
    <S.Wrapper>
      <S.BookWrapper
        onClick={() => {
          handleClickBook(bookUuid);
        }}
      >
        <S.Header>
          <S.Name>{favoriteName}</S.Name>
          <S.Favorite
            type="button"
            onClick={(event) => {
              handleClickFavoriteBtn(event, bookId);
            }}
          >
            {isFavorite ? <IcStar /> : <IcStarDefault />}
          </S.Favorite>
        </S.Header>
        <S.Title>{title}</S.Title>
        <S.Footer>
          <S.Date>{bookDate}</S.Date>
          <S.Count>{noteCount}개</S.Count>
        </S.Footer>
        <S.TrashBtn
          type="button"
          onClick={(event) => handleClickTrashBtn(event)}
        >
          <IcWaste />
        </S.TrashBtn>
      </S.BookWrapper>

      {modalOn && (
        <CommonModal
          category="book_delete"
          setModalOn={setModalOn}
          handleFn={handleDeleteBookFn}
        />
      )}
    </S.Wrapper>
  );
}

export default MyLecueBook;
