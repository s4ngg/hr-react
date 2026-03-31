import { useMutation } from "@tanstack/react-query";
import api from "../api/instance";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
    const navigate = useNavigate();
    const { setAccessToken } = useAuthStore();

    return useMutation({
        mutationFn: async (loginData) => {
            const response = await api.post("/login", {
                loginId: loginData.login_id,
                password: loginData.password,
            });
            return response.data;
        },
        onSuccess: (data) => {
            if (data.accessToken) {
                setAccessToken(data.accessToken);
                alert("로그인 성공!");
                navigate("/dashboard");
            }
        },
        onError: (error) => {
            console.error("로그인 에러:", error);
            alert("아이디 또는 비밀번호를 확인하세요.");
        },
    });
};