import axios from "axios";

const BASE_URL = '/api/dashboard';

export const getDashboard = async (memberId) => {
    const res = await axios.get(`${BASE_URL}/${memberId}`);
    return res.data.data ?? {};
}