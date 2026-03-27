import axios from 'axios';
import useAuthStore from '../../store/authStore';

const api = axios.create({
    baseURL : '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 : 모든 API 호출 전 실행
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;

        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api;
