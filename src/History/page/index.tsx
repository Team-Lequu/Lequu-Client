import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IcArrowDownBlack } from '../../assets';
import Header from '../../components/common/Header';
import MyFavoriteBookList from '../components/MyFavoriteBookList';
import MyLecueBookList from '../components/MyLecueBookList';
import MyLetterList from '../components/MyLetterList';
import SelectModal from '../components/SelectModal';
import { optionList } from '../constants/optionList';
import * as S from './History.style';

function History() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageState = Number(searchParams.get('option')); 

  const [modalOn, setModalOn] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>(pageState);
  const handleClickHistorySelectButton = () => {
    setModalOn(true);
  };

  const handleHeaderBackBtn = () => {
      navigate('/mypage/select-history');
  }

  return (
    <React.Fragment>
      {modalOn && (
        <SelectModal
          modalOn={modalOn}
          closeModal={() => setModalOn(false)}
          selectOption={(option: number) => setSelectedOption(option)}
          selectedModalOptionList={[1, 2, 3].filter(
            (num) => num !== selectedOption,
          )}
        />
      )}
      <Header headerTitle="내 기록보기" handleFn={handleHeaderBackBtn}/>
      <S.HistoryPageBodyWrapper>
        <S.HistorySelectButton
          type="button"
          onClick={handleClickHistorySelectButton}
        >
          <S.CurrentHistoryOption>
            {optionList[selectedOption]}
          </S.CurrentHistoryOption>
          <IcArrowDownBlack />
        </S.HistorySelectButton>
        {
          {
            1: <MyFavoriteBookList />,
            2: <MyLecueBookList />,
            3: <MyLetterList />,
          }[selectedOption]
        }
      </S.HistoryPageBodyWrapper>
    </React.Fragment>
  );
}

export default History;
