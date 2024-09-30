import { api } from '../../libs/api';

export const patchNickname = async (nickname: string, tempToken: string) => {
  const response = await api().patch(
    '/api/nickname',
    { nickname: nickname },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tempToken}`,
      },
    },
  );

  return { code: response.data.code };
};
