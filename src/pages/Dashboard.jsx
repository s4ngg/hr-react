import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";
import { useDashboard } from "../query/dashboardQuery";

function Dashboard() {
    // 임시 memberId (나중에 로그인 구현되면 로그인한 사용자 ID로 변경)
    const memberId = 1;
    const { data: dashboard = {}, isLoading } = useDashboard(memberId);

    if (isLoading) return <div>로딩 중...</div>;

    return (
        <>
            <Sidebar />
            <Header />
            <div className="main-dashboard">
                <div className="content-padding">
                    <div className="page-header">
                        <div className="page-title">
                            <nav className="breadcrumbs">
                                <span>운영 포털</span>
                                <span style={{ color: "var(--outline-variant)" }}>/</span>
                                <span className="active-crumb">대시보드</span>
                            </nav>
                            {/* ✅ API 데이터 연동 */}
                            <h1>반갑습니다, {dashboard.memberName ?? "사용자"} 님.</h1>
                            <p>
                                <span style={{ color: "rgb(113, 113, 255)" }}>
                                    대기 중인 승인 건이{" "}
                                    <span style={{ fontWeight: "bold" }}>
                                        {dashboard.pendingVacationCount ?? 0}건
                                    </span>
                                </span>{" "}
                                있습니다.
                            </p>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        {/* 근태 현황 카드 */}
                        <div className="card attendance-card">
                            <div>
                                <div className="card-label-row">
                                    <span className="card-label">근태 현황</span>
                                    <div className="status-badge">
                                        <span className="dot" />
                                        {dashboard.todayStatus ?? "미출근"}
                                    </div>
                                </div>
                                {/* ✅ 출근 시간 */}
                                <p className="time-display">
                                    {dashboard.todayCheckIn ?? "--:--"}
                                </p>
                                <p className="date-sub">
                                    {new Date().toLocaleDateString("ko-KR")}
                                </p>
                            </div>
                            <div className="btn-group">
                                <button
                                    className={dashboard.todayCheckIn ? "btn btn-disabled" : "btn btn-primary"}
                                    disabled={!!dashboard.todayCheckIn}
                                >
                                    <span className="material-symbols-outlined">login</span>
                                    출근하기
                                </button>
                                <button
                                    className={dashboard.todayCheckIn && !dashboard.todayCheckOut ? "btn btn-primary" : "btn btn-disabled"}
                                    disabled={!dashboard.todayCheckIn || !!dashboard.todayCheckOut}
                                >
                                    <span className="material-symbols-outlined">logout</span>
                                    퇴근하기
                                </button>
                            </div>
                        </div>

                        {/* 통계 카드 */}
                        <div className="stats-col">
                            {/* 연차 휴가 */}
                            <div className="card stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon icon-blue">
                                        <span className="material-symbols-outlined">calendar_month</span>
                                    </div>
                                    <div>
                                        <p className="stat-title">연차 휴가</p>
                                        <p className="stat-desc">잔여 휴가 일수</p>
                                    </div>
                                </div>
                                <div className="stat-value-box">
                                    {/* ✅ 잔여 휴가 */}
                                    <span className="stat-value" style={{ color: "var(--primary)" }}>
                                        {dashboard.remainVacationDays ?? 0}
                                    </span>
                                    <span className="stat-unit">일</span>
                                </div>
                                <div className="stat-bar">
                                    <div
                                        className="stat-progress"
                                        style={{
                                            width: `${dashboard.totalVacationDays
                                                ? (dashboard.remainVacationDays / dashboard.totalVacationDays) * 100
                                                : 0}%`
                                        }}
                                    />
                                </div>
                            </div>

                            {/* 이번 달 근무 */}
                            <div className="card stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon icon-orange">
                                        <span className="material-symbols-outlined">work_history</span>
                                    </div>
                                    <div>
                                        <p className="stat-title">이번 달 근무</p>
                                        <p className="stat-desc">출근 기록 일수</p>
                                    </div>
                                </div>
                                <div className="stat-value-box">
                                    {/* ✅ 이번 달 출근일 */}
                                    <span className="stat-value">{dashboard.monthlyWorkDays ?? 0}</span>
                                    <span className="stat-unit">/ {dashboard.monthlyTotalDays ?? 22} 일</span>
                                </div>
                            </div>
                        </div>

                        {/* 최근 활동 */}
                        <div className="card history-card">
                            <div className="history-header">
                                <div className="history-title-box">
                                    <h3>최근 활동</h3>
                                </div>
                            </div>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>날짜</th>
                                            <th>출근</th>
                                            <th>퇴근</th>
                                            <th>근무 시간</th>
                                            <th className="align-right">상태</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* ✅ 최근 근태 이력 */}
                                        {dashboard.recentAttendances?.length > 0 ? (
                                            dashboard.recentAttendances.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.workDate}</td>
                                                    <td>{item.checkIn ?? "-"}</td>
                                                    <td>{item.checkOut ?? "-"}</td>
                                                    <td>{item.workHours ? `${item.workHours}시간` : "-"}</td>
                                                    <td className="align-right">
                                                        <span className={`tag tag-${item.status === "NORMAL" ? "normal" : "extra"}`}>
                                                            {item.status === "NORMAL" ? "정상" : item.status === "LATE" ? "지각" : "결석"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} style={{ textAlign: "center", padding: "32px" }}>
                                                    근태 이력이 없습니다.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withPageStyle(Dashboard, "dashboard.css", pageCss);