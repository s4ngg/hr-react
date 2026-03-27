import axios from 'axios';

const api = axios.creat({
    // baseURL : ''
    headrs: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 : 모든 API 호출 전 실행
api.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰 꺼냄
        const token = localStorage.getItem('accessToken');

        // 토큰이 존재하면 헤더에 Bearer 토큰 추가
        if (token) {
            config.headrs.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api;
