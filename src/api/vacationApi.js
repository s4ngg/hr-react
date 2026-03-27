import axios from "axios";
import api from "./axios";

const BASE_URL ='/vacations';


// 휴가 신청
export const getVacations = async (dto) => {
    const res =await api.post(BASE_URL, dto);
    return res.data;
}

// 휴가 내역 조회
export const getMyVacationHistory = async () =>{
    const res =await api.get(`${BASE_URL}/my`);
    return res.data;
}