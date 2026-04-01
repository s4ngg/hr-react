import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/instance";

// 내 휴가 내역 조회
export const useMyVacationHistory = () => {
    return useQuery({
        queryKey: ["myVacationHistory"],
        queryFn: async () => {
            const res = await api.get("/vacations/my");
            return res.data.data;
        },
    });
};

// 휴가 신청
export const useRequestVacation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (vacationData) => {
            const res = await api.post("/vacations", vacationData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myVacationHistory"] });
        },
        onError: (error) => {
            console.error("신청 실패:", error);
        },
    });
};

// 관리자 승인 대기 목록 조회
export const usePendingVacations = (enabled = true) => {
    return useQuery({
        queryKey: ["pendingVacations"],
        queryFn: async () => {
            const res = await api.get("/admin/vacations/pending");
            return res.data.data;
        },
        enabled,
    });
};

// 관리자 휴가 상태 변경
export const useUpdateVacationStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ vacationId, status }) => {
            const res = await api.patch(`/admin/vacations/${vacationId}/status`, {
                status,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pendingVacations"] });
            queryClient.invalidateQueries({ queryKey: ["myVacationHistory"] });
        },
        onError: (error) => {
            console.error("휴가 상태 변경 실패:", error);
        },
    });
};