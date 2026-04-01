import axios from "axios";
import { setupInterceptors } from "./interceptor";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

setupInterceptors(api);

export default api;