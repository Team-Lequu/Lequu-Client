import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IcMypageArrowRight, IcMypageTouchbar } from '../../../assets';
import { optionList } from '../../constants/optionList';
import SelectModalPortal from '../SelectModalPortal';
import * as S from './SelectModal.style';

interface SelectModalProps {
  modalOn: boolean;
  closeModal: () => void;
  selectOption: (option: number) => void;
  selectedModalOptionList: Array<number>;
}

function SelectModal({
  modalOn,
  closeModal,
  selectOption,
  selectedModalOptionList,
}: SelectModalProps) {
  const [animationDirection, setAnimationDirection] = useState('slideUp');
  const navigate = useNavigate();
  
  const handleCloseModal = () => {
    setAnimationDirection('slideDown');
    setTimeout(() => {
      closeModal();
      setAnimationDirection('slideUp');
    }, 200);
  };

  return (
    <SelectModalPortal>
      <S.SelectModalWrapper onClick={() => handleCloseModal()}>
        <S.SelectModalContainer
          onClick={(e) => e.stopPropagation()}
          animationDirection={animationDirection}
          modalOn={modalOn}
        >
          <S.ClosebarContainer onClick={() => handleCloseModal()}>
            <IcMypageTouchbar />
          </S.ClosebarContainer>
          <S.OptionList>
            {selectedModalOptionList.map((item) => (
              <S.OptionListItem
                key={item}
                onClick={() => {
                  selectOption(item);
                  handleCloseModal();
                  navigate(`/mypage/history?option=${item}`)
                }}
              >
                <S.OptionListItemText>{optionList[item]}</S.OptionListItemText>
                <IcMypageArrowRight />
              </S.OptionListItem>
            ))}
          </S.OptionList>
        </S.SelectModalContainer>
      </S.SelectModalWrapper>
    </SelectModalPortal>
  );
}

export default SelectModal;
