import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ImgMypageFavoriteLecueBook,
  ImgMypageLetter,
  ImgMypageMakeLecueBook,
} from '../../assets';
import Header from '../../components/common/Header';
import * as S from './HistoryEnter.style';

function HistoryEnter() {
  const navigate = useNavigate();

  const handleHeaderBackBtn = () => {
    navigate('/mypage');
  }

  const HistoryEnterList = useMemo(
    () => [
      {
        title: '즐겨찾기한 레큐북',
        variant: 'book',
        image: <ImgMypageFavoriteLecueBook />,
        handleClickTab: () => navigate('/mypage/history?option=1'),
      },
      {
        title: '내가 만든 레큐북',
        variant: 'book',
        image: <ImgMypageMakeLecueBook />,
        handleClickTab: () => navigate('/mypage/history?option=2'),
      },
      {
        title: '내가 남긴 레터',
        variant: 'letter',
        image: <ImgMypageLetter />,
        handleClickTab: () => navigate('/mypage/history?option=3'),
      },
    ],
    [],
  );

  return (
    <React.Fragment>
      <Header headerTitle="내 기록보기" handleFn={handleHeaderBackBtn}/>
      <S.HistoryEnterPageBodyWrapper>
        {HistoryEnterList.map((element) => {
          return (
            <S.Tab
              variant={element.variant}
              key={element.title}
              onClick={element.handleClickTab}
            >
              <S.Text>{element.title}</S.Text>
              {element.image}
            </S.Tab>
          );
        })}
      </S.HistoryEnterPageBodyWrapper>
    </React.Fragment>
  );
}

export default HistoryEnter;
