import axios from 'axios';

const BASE_URL = '/api/attendance';

// 근태 목록 조회
export const getAttendanceList = async () => {
    const res = await axios.get(BASE_URL);
    return res.data.data ?? [];
};

// 근태 검색
export const searchAttendance = async (keyword) => {
    const res = await axios.get(`${BASE_URL}/search`, {
        params: { keyword }
    });
    return res.data.data ?? [];
};

// 근태 생성
export const createAttendance = async (dto) => {
    const res = await axios.post(BASE_URL, dto);
    return res.data;
};

// 근태 수정
export const updateAttendance = async (attendanceId, dto) => {
    const res = await axios.put(`${BASE_URL}/${attendanceId}`, dto);
    return res.data;
};

// 근태 삭제
export const deleteAttendance = async (attendanceId) => {
    const res = await axios.delete(`${BASE_URL}/${attendanceId}`);
    return res.data;
};