import axios from 'axios';

const BASE_URL = '/api/employee';

// 직원 목록 조회
export const getEmployeeList = async () => {
    const res = await axios.get(BASE_URL);
    return res.data.data ?? [];
};

// 직원 검색
export const searchEmployee = async (name) => {
    const res = await axios.get(`${BASE_URL}/search`, {
        params: { name }
    });
    return res.data.data ?? [];
};

// 직원 생성
export const createEmployee = async (dto) => {
    const res = await axios.post(BASE_URL, dto);
    return res.data;
};

// 직원 수정
export const updateEmployee = async (employeeId, dto) => {
    const res = await axios.put(`${BASE_URL}/${employeeId}`, dto);
    return res.data;
};

// 직원 삭제
export const deleteEmployee = async (employeeId) => {
    const res = await axios.delete(`${BASE_URL}/${employeeId}`);
    return res.data;
};