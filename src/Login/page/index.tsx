import Comment from '../components/Comment';
import Header from '../components/Header';
import LecueLogo from '../components/LecueLogo';
import LoginBtnContainer from '../components/LoginBtnContainer';
import * as S from './Login.style';

function Login() {
  return (
    <S.LoginWrapper>
      <Header />
      <LecueLogo />
      <Comment />
      <LoginBtnContainer />
    </S.LoginWrapper>
  );
}

export default Login;
