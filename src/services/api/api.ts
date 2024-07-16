import axios from 'axios';
import { API_URLS } from './api_urls';

export const tiqueApi = axios.create({
  baseURL: API_URLS.PROD,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
  timeout: 10000,
});

export const TIQUE_API_URL = tiqueApi.defaults.baseURL;
