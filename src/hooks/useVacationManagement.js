import useAuthStore from "../store/authStore";
import {
    useMyVacationHistory,
    usePendingVacations,
    useUpdateVacationStatus,
} from "../query/vacationQuery";

export const useVacationManagement = () => {
    const { user } = useAuthStore();
    const isAdmin = user?.role === "ADMIN";

    const {
        data: history = [],
        isLoading: historyLoading,
        isError: historyError,
    } = useMyVacationHistory();

    const {
        data: pendingVacations = [],
        isLoading: pendingLoading,
        isError: pendingError,
    } = usePendingVacations(isAdmin);

    const { mutate: updateVacationStatus } = useUpdateVacationStatus();

    const handleApprove = (vacationId) => {
        updateVacationStatus({
            vacationId,
            status: "APPROVED",
            adminComment: "",
        });
    };

    const handleReject = (vacationId) => {
        const reason = window.prompt("반려 사유를 입력하세요.");
        if (!reason) return;

        updateVacationStatus({
            vacationId,
            status: "REJECTED",
            adminComment: reason,
        });
    };

    return {
        isAdmin,
        history,
        historyLoading,
        historyError,
        pendingVacations,
        pendingLoading,
        pendingError,
        handleApprove,
        handleReject,
    };
};