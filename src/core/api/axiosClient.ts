import axios from 'axios';
import { API_BASE_URL } from '../constants/apiEndpoints';

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Response interceptor — unwrap data
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('[API Error]', error.response?.data ?? error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
