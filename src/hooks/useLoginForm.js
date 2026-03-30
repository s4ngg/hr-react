import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/instance"; 
import useAuthStore from "../../store/authStore";

export const useLoginForm = () => {
    const navigate = useNavigate();
    const { setAccessToken } = useAuthStore(); 
    const [formData, setFormData] = useState({ login_id: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", {
                loginId: formData.login_id,
                password: formData.password
            });

            const data = response.data;

            if (data.accessToken) {

                setAccessToken(data.accessToken); 
                
                alert("로그인 성공");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("로그인 에러:", error);
            alert("아이디 또는 비밀번호를 확인하세요.");
        }
    };

    return { formData, handleChange, handleLogin };
};