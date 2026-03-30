import { getAccessToken } from '../auth/tokenProvider';

// 함수명은 참고만 해주세요.
export const setupInterceptors = (api) => {

    // 요청 인터셉터
    api.interceptors.request.use(
        (config) => {
            const token = getAccessToken();

            config.headers = config.headers ?? {};

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );
};