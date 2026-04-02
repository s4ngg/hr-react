import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyVacationQuota, useRequestVacation } from "../query/vacationQuery";

const calculateEndDate = (startDate, days) => {
    if (!startDate) return "";

    const numericDays = Number(days);
    const date = new Date(startDate);
    date.setDate(date.getDate() + numericDays - 1);

    return date.toISOString().split("T")[0];
};

export const useVacationRequest = () => {
    const navigate = useNavigate();
    const { mutate: requestVacation, isPending } = useRequestVacation();
    const {
        data: quota,
        isLoading: quotaLoading,
        isError: quotaError,
    } = useMyVacationQuota();

    const [vacationType, setVacationType] = useState("기타");
    const [detailReason, setDetailReason] = useState("");
    const [startDate, setStartDate] = useState("");
    const [days, setDays] = useState("1");
    const [proxyEmployeeId, setProxyEmployeeId] = useState("");

    const remainingVacationDays = quota?.remainingDays ?? 0;
    const expectedRemainingDays = Math.max(
        remainingVacationDays - Number(days || 0),
        0
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!startDate) {
            alert("연차 사용일을 선택하세요.");
            return;
        }

        if (Number(days) > remainingVacationDays) {
            alert("잔여 연차를 초과했습니다.");
            return;
        }

        if (startDate < minStartDate) {
            alert("연차 사용일은 내일부터 선택할 수 있습니다.");
            return;
        }

        const endDate = calculateEndDate(startDate, days);

        requestVacation(
            {
                vacationType,
                detailReason: vacationType === "기타" ? detailReason : "",
                startDate,
                endDate,
                days: Number(days),
                proxyEmployeeId: proxyEmployeeId.trim() || null,
            },
            {
                onSuccess: () => {
                    alert("휴가 신청이 완료되었습니다.");
                    navigate("/vacation-management");
                },
                onError: (error) => {
                    const message =
                        error?.response?.data?.message ||
                        error?.response?.data?.error ||
                        "휴가 신청에 실패했습니다.";
                    alert(message);
                },
            }
        );
    };

    const handleCancel = () => {
        navigate("/vacation-management");
    };

    const getTomorrowDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const minStartDate = getTomorrowDate();

    return {
        vacationType,
        setVacationType,
        detailReason,
        setDetailReason,
        startDate,
        setStartDate,
        days,
        setDays,
        proxyEmployeeId,
        setProxyEmployeeId,
        quota,
        quotaLoading,
        quotaError,
        remainingVacationDays,
        expectedRemainingDays,
        handleSubmit,
        handleCancel,
        isPending,
        minStartDate
    };
};