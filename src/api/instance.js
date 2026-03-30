import axios from 'axios';

const api = axios.create({
    baseURL : '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 인터셉터 적용
setupInterceptors(api);

export default api;
