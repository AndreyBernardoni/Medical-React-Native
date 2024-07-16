import { GetShortcutsResponseType } from './types';
import { TIQUE_API_URL } from '../api/api';
import { API_ROUTES } from '../api/api_routes';
import { authGet } from '../useService';

export const getShortcuts = async ({
  period = 'current',
  page = 1,
}: {
  period: string;
  page: number;
}): Promise<GetShortcutsResponseType> => {
  const ORIGIN = '@Services/getShortcutsServices/getShortcuts():';

  return new Promise(async (resolve, reject) => {
    try {
      const route =
        TIQUE_API_URL +
        API_ROUTES.GET_SHORTCUTS +
        `?period=${period}&page=${page}`;

      console.log('route:', route);

      const response = await authGet({
        route,
        onSuccess: data => {
          console.log(ORIGIN + 'onSuccess:', data);
        },
        onError: error => {
          console.log(ORIGIN + 'onError:', error);
        },
      });

      return resolve(response);
    } catch (error) {
      console.error(ORIGIN + 'Erro ao recuperar dados do Shortcut:', error);
      return reject({
        msg: 'GET_SHORTCUTS_ERROR',
        ui: 'Erro ao recuperar atalhos.',
      });
    }
  });
};
