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
        });
    };

    const handleReject = (vacationId) => {
        if (!isAdmin) return;

        updateVacationStatus({
            vacationId,
            status: "REJECTED",
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