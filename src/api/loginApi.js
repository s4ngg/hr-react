import api from "./axios";

export const login = async (loginId, password) =>{

    const res =await api.post("/login",{loginId, password});
    return res.data 
}