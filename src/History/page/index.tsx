import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { IcArrowDownBlack } from '../../assets';
import Header from '../../components/common/Header';
import SelectModal from '../components/SelectModal';
import { optionList } from '../constants/optionList';
import { HistorySection } from '../types/historyType';
import * as S from './History.style';

function History() {
  const SECTION_LIST: HistorySection[] = ['favorite', 'mybook', 'myletter'];

  const navigate = useNavigate();
  const url = useLocation().pathname.split('/');
  const section = url[url.length - 1];

  const [modalOn, setModalOn] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(section);

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
          selectOption={(section: HistorySection) => setSelectedOption(section)}
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
        <Outlet />
      </S.HistoryPageBodyWrapper>
    </React.Fragment>
  );
}

export default History;
