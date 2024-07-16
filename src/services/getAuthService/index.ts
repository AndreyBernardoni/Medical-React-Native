import { SignInResponseType } from './types';
import { TIQUE_API_URL, tiqueApi } from '../api/api';
import { API_ROUTES } from '../api/api_routes';

export const signIn = async (
  email: string,
  password: string,
): Promise<SignInResponseType> => {
  return new Promise(async (resolve, reject) => {
    const ORIGIN = '@Services/getAuthServices/SignIn():';

    try {
      const token_type = 'account';
      const route = TIQUE_API_URL + API_ROUTES.SIGN_IN;
      const body = { email, password, token_type };

      const response = await tiqueApi.post<SignInResponseType>(route, body);
      const token = response?.data?.token;

      if (!token) {
        return reject({ msg: 'TOKEN_EMPTY', ui: 'Token não gerado.' });
      }

      return resolve({ token });
    } catch (error) {
      console.error(ORIGIN + 'Erro ao fazer SignIn:', error);
      return reject({ msg: 'SIGN_IN_ERROR', ui: 'Erro ao fazer SignIn.' });
    }
  });
};
