import axios from "axios";

const BASE_URL = "/api/it-contact";

export const createContact = async(data) => {
    const res = await axios.post(BASE_URL, data);
    return res.data;
};