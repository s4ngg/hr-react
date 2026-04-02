import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyVacationQuota, useRequestVacation } from "../query/vacationQuery";

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

    const remainingVacationDays = quota?.remainingDays ?? 0;
    const expectedRemainingDays = Math.max(remainingVacationDays - Number(days), 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!startDate) {
            alert("연차 사용일을 선택하세요.");
            return;
        }

        requestVacation(
            {
                vacationType,
                startDate,
                endDate: startDate,
                days: Number(days),
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

    return {
        vacationType,
        setVacationType,
        detailReason,
        setDetailReason,
        startDate,
        setStartDate,
        days,
        setDays,
        quota,
        quotaLoading,
        quotaError,
        remainingVacationDays,
        expectedRemainingDays,
        handleSubmit,
        handleCancel,
        isPending,
    };
};