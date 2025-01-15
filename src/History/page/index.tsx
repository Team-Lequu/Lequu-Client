import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IcArrowDownBlack } from '../../assets';
import Header from '../../components/common/Header';
import MyFavoriteBookList from '../components/MyFavoriteBookList';
import MyLecueBookList from '../components/MyLecueBookList';
import MyLetterList from '../components/MyLetterList';
import SelectModal from '../components/SelectModal';
import { optionList } from '../constants/optionList';
import * as S from './History.style';

function History() {
  const SECTION_LIST = ['favorite', 'myBook', 'myLetter'];

  const navigate = useNavigate();
  const { section } = useParams();

  const [modalOn, setModalOn] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    section ? section : '',
  );

  useEffect(() => {
    if (section) {
      setSelectedOption(section);
    }
  }, [section]);

  const handleClickHistorySelectButton = () => {
    setModalOn(true);
  };

  const handleHeaderBackBtn = () => {
    navigate('/mypage/select-history');
  };

  return (
    <React.Fragment>
      {modalOn && (
        <SelectModal
          modalOn={modalOn}
          closeModal={() => setModalOn(false)}
          selectOption={(section: string) => setSelectedOption(section)}
          selectedModalOptionList={SECTION_LIST.filter(
            (item) => item !== selectedOption,
          )}
        />
      )}
      <Header headerTitle="내 기록보기" handleFn={handleHeaderBackBtn} />
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
        {section &&
          {
            favorite: <MyFavoriteBookList />,
            myBook: <MyLecueBookList />,
            myLetter: <MyLetterList />,
          }[section]}
      </S.HistoryPageBodyWrapper>
    </React.Fragment>
  );
}

export default History;
