import { create } from "zustand";


const useAuthStore = create((set)=> ({
    accessToken: null, 
    user: null,

    setAuth: (data) => 
        set({
            accessToken: data.token,
            user:{
                memberId: data.memberId,
                employeeNo: data.employeeNo,
                name: data.name,
                role: data.role,
                deptName: data.deptName,
                departmentId: data.departmentId,
            },
        }),

        logout: () =>
            set({
                accessToken: null,
                user: null,
            }),
}));

export default useAuthStore;


