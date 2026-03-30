import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../api/instance";

//내 휴가 내역 조회
export const useMyVacationHistory = (memberId) =>{
    return useQuery({
        queryKey: ['myVacationHistory', memberId],
        queryFn: async() =>{
            const res = await api.get(`/vacations/my/${memberId}`);
            return res.data;
        },
        enabled: !!memberId,
    })
}

// 휴가 신청
export const useRequestVacation = (token) =>{
    const queryClient = useQueryClient();


    return useMutation({

    mutationFn: async (vacationData) => {
    
    const res = await api.post('/vacation', vacationData);
    return res.data;
    },
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['vacationHistory'] });
    alert("휴가 신청이 완료되었습니다!");
    },
    onError: (error) => {
    console.error("신청 실패:", error);
    }
});
}