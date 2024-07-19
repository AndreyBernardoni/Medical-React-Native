import { GetUserResponseType } from './types';
import { API_ROUTES } from '../api/api_routes';
import { authPost } from '../useService';
import { MEDICAL_API_URL } from '../api/api';

export const signUpUser = async ({
  body,
}: {
  body: any;
}): Promise<GetUserResponseType> => {
  const ORIGIN = '@Services/getUserService/SignUpUser() - ';

  return new Promise(async (resolve, reject) => {
    try {
      const route = MEDICAL_API_URL + API_ROUTES.AUTH + API_ROUTES.SIGN_UP;

      console.log(body);

      const response = await authPost({
        route,
        onSuccess: data => {
          console.log(ORIGIN + 'onSuccess:', data);
        },
        onError: error => {
          console.log(ORIGIN + 'onError:', error);
        },
        bypassLogin: true,
        body,
      });

      return resolve(response);
    } catch (error) {
      console.error(ORIGIN + 'Erro ao recuperar user:', error);
      return reject({ msg: 'GET_USER_ERROR', ui: 'Erro ao recuperar user.' });
    }
  });
};

export const signInUser = async ({
  body,
}: {
  body: any;
}): Promise<GetUserResponseType> => {
  const ORIGIN = '@Services/getUserService/signInUser() - ';

  return new Promise(async (resolve, reject) => {
    try {
      const route = MEDICAL_API_URL + API_ROUTES.AUTH + API_ROUTES.SIGN_IN;

      const response = await authPost({
        route,
        onSuccess: data => {
          console.log(ORIGIN + 'onSuccess:', data);
        },
        onError: error => {
          console.log(ORIGIN + 'onError:', error);
        },
        bypassLogin: true,
        body,
      });

      return resolve(response);
    } catch (error) {
      console.error(ORIGIN + 'Erro ao recuperar user:', error);
      return reject({ msg: 'GET_USER_ERROR', ui: 'Erro ao recuperar user.' });
    }
  });
};
