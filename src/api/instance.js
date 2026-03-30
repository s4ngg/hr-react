import axios from 'axios';
import { setupInterceptors } from './interceptor';

const api = axios.create({
    baseURL : '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 인터셉터 적용
setupInterceptors(api);

export default api;
