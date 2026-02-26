import axios from 'axios';
import { API_BASE_URL } from '../constants/apiEndpoints';
import { applyInterceptors } from './interceptors';

// ── Axios instance ────────────────────────────────────────────────────────────

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// ── Apply request & response interceptors ─────────────────────────────────────

applyInterceptors(axiosClient);

export default axiosClient;
