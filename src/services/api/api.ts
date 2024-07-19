import axios from 'axios';
import { API_URLS } from './api_urls';

export const medicalApi = axios.create({
  baseURL: API_URLS.LOCAL,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
  timeout: 10000,
});

export const MEDICAL_API_URL = medicalApi.defaults.baseURL;
