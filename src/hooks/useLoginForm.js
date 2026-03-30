import { useState } from "react";
import { useNavigate } from "react-router-dom"
// 공통 인스턴스 머지후 임포트해야함

export const useLoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ login_id: "", password: ""});

    const handleChange = (e) => {
        const {name ,value} = e.target;
        setFormData((prev) => ({ ...prev,[name]: value }))
    }

    const handleLogin = async (e) => {
    e.preventDefault();
    try{
        const data = await login(formData.login_id, formData.password);
        if (data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                alert("로그인 성공");
                navigate("/dashboard"); 
    } 

} catch (error){
    alert("아이디 또는 비밀번호를 확인하세요.");
}
    };
    return {formData, handleChange, handleLogin};
};