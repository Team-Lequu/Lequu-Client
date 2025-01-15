import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IcMypageArrowRight } from '../../assets';
import Header from '../../components/common/Header';
import useGetMyNickName from '../../libs/hooks/useGetMyNickname';
import * as S from './Enter.style';

function Enter() {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const isLogin = sessionStorage.getItem('token');

  if (isLogin) {
    const { myNickName } = useGetMyNickName();
    if (nickname === '' || nickname !== myNickName) setNickname(myNickName);
  }

  const handleClickNickname = () => {
    navigate('edit-nickname');
  };
  const handleClickHistory = () => {
    navigate('select-history');
  };
  const handleClickLogin = () => {
    navigate('/login');
  };

  const handleClickLogout = () => {
    const isLogout = confirm('로그아웃하시겠습니까?');

    if (isLogout) {
      sessionStorage.clear();
      navigate('/', { state: { step: 1 } });
    }
  };

  const handleHeaderBackBtn = () => {
    navigate('/');
  };

  return (
    <React.Fragment>
      <Header headerTitle="마이페이지" handleFn={handleHeaderBackBtn} />
      {isLogin ? (
        <S.MypageBodyWrapper>
          <S.NicknameWrapper>
            <S.NicknameText>{nickname}님, 안녕하세요</S.NicknameText>
          </S.NicknameWrapper>
          <S.MenuWrapper>
            <S.SubTitle>프로필</S.SubTitle>
            <S.Tab onClick={handleClickNickname}>
              <S.Text>닉네임 수정</S.Text>
              <IcMypageArrowRight />
            </S.Tab>
            <S.Tab onClick={handleClickHistory}>
              <S.Text>내 기록보기</S.Text>
              <IcMypageArrowRight />
            </S.Tab>
          </S.MenuWrapper>
          <S.Line />
          <S.MenuWrapper>
            <S.SubTitle>서비스 이용 방침</S.SubTitle>
            <S.Link
              href="https://www.instagram.com/lecue_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
            >
              <S.Text>팀 소개</S.Text>
              <IcMypageArrowRight />
            </S.Link>
            <S.Link
              href="https://rileybyeon.notion.site/TEAM-LECUE-b7801fe345544442938d3e54980032e4?pvs=4"
              target="_blank"
              rel="noreferrer"
            >
              <S.Text>공지사항</S.Text>
              <IcMypageArrowRight />
            </S.Link>
            <S.Link
              href="https://forms.gle/ttG3rMR9VriyegJ3A"
              target="_blank"
              rel="noreferrer"
            >
              <S.Text>문의하기</S.Text>
              <IcMypageArrowRight />
            </S.Link>
          </S.MenuWrapper>
          <S.Line />
          <S.MenuWrapper>
            <S.SubTitle>기타</S.SubTitle>
            <S.Tab onClick={handleClickLogout}>
              <S.Text>로그아웃</S.Text>
              <IcMypageArrowRight />
            </S.Tab>
          </S.MenuWrapper>
        </S.MypageBodyWrapper>
      ) : (
        <S.MypageBodyWrapper>
          <S.NicknameWrapper onClick={handleClickLogin} variant={'login'}>
            <S.NicknameText>로그인하세요</S.NicknameText>
            <IcMypageArrowRight />
          </S.NicknameWrapper>
          <S.MenuWrapper>
            <S.SubTitle>서비스 이용 방침</S.SubTitle>
            <S.Link
              href="https://www.instagram.com/lecue_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
            >
              <S.Text>팀 소개</S.Text>
              <IcMypageArrowRight />
            </S.Link>
            <S.Link
              href="https://rileybyeon.notion.site/TEAM-LECUE-b7801fe345544442938d3e54980032e4?pvs=4"
              target="_blank"
              rel="noreferrer"
            >
              <S.Text>공지사항</S.Text>
              <IcMypageArrowRight />
            </S.Link>
            <S.Link
              href="https://forms.gle/ttG3rMR9VriyegJ3A"
              target="_blank"
              rel="noreferrer"
            >
              <S.Text>문의하기</S.Text>
              <IcMypageArrowRight />
            </S.Link>
          </S.MenuWrapper>
        </S.MypageBodyWrapper>
      )}
    </React.Fragment>
  );
}

export default Enter;
