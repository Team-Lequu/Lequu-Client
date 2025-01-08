import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../../components/common/Header';
import LoadingPage from '../../../components/common/LoadingPage';
import usePostStickerState from '../../../StickerAttach/hooks/usePostStickerState';
import BookInfoBox from '../../components/BookInfoBox';
import LecueNoteListContainer from '../../components/LecueNoteListContainer';
import SlideBanner from '../../components/SlideBanner';
import useGetBookDetail from '../../hooks/useGetBookDetail';
import useGetBookDetailLogin from '../../hooks/useGetBookDetailLogin';
import * as S from './DetailPage.style';

function DetailPage() {
  const [isEditable, setIsEditable] = useState(true);

  const isLogin = sessionStorage.getItem('token');

  const { bookUuid } = useParams() as { bookUuid: string };
  const { bookDetail, isLoading } = isLogin
    ? useGetBookDetailLogin(bookUuid)
    : useGetBookDetail(bookUuid);
  const postMutation = usePostStickerState(bookUuid);

  const setEditableStateTrue = () => {
    setIsEditable(true);
  };

  return isLoading || postMutation.isLoading ? (
    <LoadingPage />
  ) : (
    <S.DetailPageWrapper>
      <Header headerTitle="레큐북" isDetailPage={!isEditable} />
      <S.DetailPageBodyWrapper>
        <SlideBanner name={bookDetail.favoriteName} />
        <S.LecueBookContainer>
          <BookInfoBox {...bookDetail} bookUuid={bookUuid} />
          <LecueNoteListContainer
            bookId={bookDetail.bookId}
            bookUuid={bookUuid}
            isEditable={isEditable}
            setEditableStateTrue={setEditableStateTrue}
            noteNum={bookDetail.noteNum}
            backgroundColor={bookDetail.bookBackgroundColor}
            noteList={bookDetail.noteList}
            postedStickerList={bookDetail.postedStickerList}
          />
        </S.LecueBookContainer>
      </S.DetailPageBodyWrapper>
    </S.DetailPageWrapper>
  );
}

export default DetailPage;
