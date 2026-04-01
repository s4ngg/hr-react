import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
    useMyVacationHistory,
    usePendingVacations,
    useUpdateVacationStatus,
} from "../query/vacationQuery";

export const useVacationManagement = () => {
    const navigate = useNavigate();
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
        if (!isAdmin) return;

        updateVacationStatus({
            vacationId,
            status: "APPROVED",
            adminComment: "",
        });
    };

    const handleReject = (vacationId) => {
        if (!isAdmin) return;

        const reason = window.prompt("반려 사유를 입력하세요.");
        if (reason === null) return;

        updateVacationStatus({
            vacationId,
            status: "REJECTED",
            adminComment: reason,
        });
    };

    const goToVacationRequest = () => {
        navigate("/vacation-request");
    };

    const goToVacationRequestList = () => {
        if (!isAdmin) return;
        navigate("/vacation-request-list");
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
        goToVacationRequest,
        goToVacationRequestList,
    };
};