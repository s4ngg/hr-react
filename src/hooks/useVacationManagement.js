import { useNavigate } from "react-router-dom";
import  useAuthStore  from "../store/authStore";
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

    const getMonthsWorked = (hireDate) => {
        if (!hireDate) return 0;

        const joined = new Date(hireDate);
        const today = new Date();

        let months =
            (today.getFullYear() - joined.getFullYear()) * 12 +
            (today.getMonth() - joined.getMonth());

        if (today.getDate() < joined.getDate()) {
            months -= 1;
        }

        return Math.max(months, 0);
    };

    const getYearsWorked = (hireDate) => {
        if (!hireDate) return 0;

        const joined = new Date(hireDate);
        const today = new Date();

        let years = today.getFullYear() - joined.getFullYear();

        const beforeAnniversary =
            today.getMonth() < joined.getMonth() ||
            (today.getMonth() === joined.getMonth() && today.getDate() < joined.getDate());

        if (beforeAnniversary) {
            years -= 1;
        }

        return Math.max(years, 0);
    };

    const monthsWorked = getMonthsWorked(user?.hireDate);
    const yearsWorked = getYearsWorked(user?.hireDate);

    const totalVacationDays = isAdmin
        ? 20 + yearsWorked * 15
        : 15 + monthsWorked;

    const usedVacationDays = history
        .filter((item) => item.status === "APPROVED")
        .reduce((sum, item) => sum + (item.days || 0), 0);

    const remainingVacationDays = Math.max(totalVacationDays - usedVacationDays, 0);

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
        totalVacationDays,
        usedVacationDays,
        remainingVacationDays,
        handleApprove,
        handleReject,
        goToVacationRequest,
        goToVacationRequestList,
    };
};