import {
  GetVacationsBalancesResponseType,
  GetVacationsPeriodsResponseType,
  GetVacationsSolicitationResponseType,
} from './types';

import { authGet } from '../useService';

import { TIQUE_API_URL } from '../api/api';
import { API_ROUTES } from '../api/api_routes';

export const getVacationsSolicitations = async ({
  type = 'all',
  page = 1,
}: {
  type?: string;
  page?: number;
}): Promise<GetVacationsSolicitationResponseType> => {
  const ORIGIN = '@Services/getVacationsServices/getVacationsSolicitations():';

  return new Promise(async (resolve, reject) => {
    try {
      const route =
        TIQUE_API_URL +
        API_ROUTES.GET_WORK_LEAVES +
        `&type=${type}&page=${page}&max_results=15`;

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
      console.error(ORIGIN + 'Erro ao recuperar dados de Vacations:', error);
      return reject({
        msg: 'GET_Vacations_ERROR',
        ui: 'Erro ao recuperar Vacations.',
      });
    }
  });
};
export const getVacationsPeriods = async ({
  status = 'all',
  page = 1,
}: {
  status?: string;
  page?: number;
}): Promise<GetVacationsPeriodsResponseType> => {
  const ORIGIN = '@Services/getVacationsServices/getVacationsPeriods():';

  return new Promise(async (resolve, reject) => {
    try {
      const route =
        TIQUE_API_URL +
        API_ROUTES.GET_VACATIONS +
        `/periods?type=pending&page=${page}&max_results=15` +
        (status !== 'all' ? `&status=${status}` : '');

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
      console.error(ORIGIN + 'Erro ao recuperar dados de Vacations:', error);
      return reject({
        msg: 'GET_Vacations_ERROR',
        ui: 'Erro ao recuperar Vacations.',
      });
    }
  });
};
export const getVacationsBalances = async ({
  page = 1,
}: {
  page: number;
}): Promise<GetVacationsBalancesResponseType> => {
  const ORIGIN = '@Services/getVacationsServices/getVacationsBalances():';

  return new Promise(async (resolve, reject) => {
    try {
      const route =
        TIQUE_API_URL +
        API_ROUTES.GET_VACATIONS +
        `/balances?type=pending&page=${page}&max_results=15`;

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
      console.error(ORIGIN + 'Erro ao recuperar dados de Vacations:', error);
      return reject({
        msg: 'GET_Vacations_ERROR',
        ui: 'Erro ao recuperar Vacations.',
      });
    }
  });
};
