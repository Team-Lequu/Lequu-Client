import styled from '@emotion/styled';

export const LoginWrapper = styled.section`
  width: 100vw;
  height: 100dvh;

  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.key} 1%,
    ${({ theme }) => theme.colors.background} 50%
  );
`;
