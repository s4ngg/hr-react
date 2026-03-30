import { useState, useEffect } from "react";
import { getAllAttendances, checkIn, checkOut } from "../api/attendanceApi";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";

function AttendanceManagement() {
    const [attendances, setAttendances] = useState([]);
    const [todayAttendance, setTodayAttendance] = useState(null);
    const memberId = 1; // 로그인 기능 생기면 교체

    const fetchAttendances = async () => {
        const data = await getAllAttendances();
        setAttendances(data);
        // 오늘 날짜 근태 찾기
        const today = new Date().toISOString().slice(0, 10);
        const todays = data.find(a => a.workDate === today && a.memberId === memberId);
        setTodayAttendance(todays ?? null);
    };

    const handleCheckIn = async () => {
        try {
            await checkIn(memberId);
            alert("출근 완료!");
            fetchAttendances();
        } catch (e) {
            alert("출근 처리 실패: " + e.message);
        }
    };

    const handleCheckOut = async () => {
        try {
            await checkOut(todayAttendance.attendanceId, memberId);
            alert("퇴근 완료!");
            fetchAttendances();
        } catch (e) {
            alert("퇴근 처리 실패: " + e.message);
        }
    };

    useEffect(() => { fetchAttendances(); }, []);

    const today = new Date();
    const thisMonth = today.toISOString().slice(0, 7);
    const thisMonthData = attendances.filter(a => a.workDate?.startsWith(thisMonth));
    const workDays = thisMonthData.filter(a => a.checkIn).length;
    const lateDays = thisMonthData.filter(a => a.status === 'LATE').length;
    const absentDays = thisMonthData.filter(a => a.status === 'ABSENT').length;
    const totalDays = thisMonthData.length;
    const attendanceScore = totalDays > 0
        ? ((workDays / totalDays) * 100).toFixed(1)
        : 0;
    return (
        <>
            <Sidebar checkInLabel="출근하기" />
            <Header />
            <main>
                <div className="page-header">
                    <div className="page-title">
                        <nav className="breadcrumbs">
                            <span>운영 포털</span>
                            <span style={{ color: "var(--outline-variant)" }}>/</span>
                            <span className="active-crumb">근태 관리</span>
                        </nav>
                        <h1>근태 현황 개요</h1>
                        <p>2023년 10월 인력 현황 및 근태 성실도를 모니터링합니다.</p>
                    </div>
                </div>
                <div className="content-canvas">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="icon-box blue">
                                    <span className="material-symbols-outlined"
                                        style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                </div>
                                <span className="trend-badge trend-up">+2.4%</span>
                            </div>
                            <div>
                                <p className="stat-value">22 <span className="stat-unit">일</span></p>
                                <p className="stat-label">이번 달 출근 일수</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="icon-box orange">
                                    <span className="material-symbols-outlined"
                                        style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                                </div>
                                <span className="trend-badge trend-down">-12%</span>
                            </div>
                            <div>
                                <p className="stat-value">03 <span className="stat-unit">회</span></p>
                                <p className="stat-label">지각 횟수</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="icon-box red">
                                    <span className="material-symbols-outlined"
                                        style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                                </div>
                            </div>
                            <div>
                                <p className="stat-value">01 <span className="stat-unit">일</span></p>
                                <p className="stat-label">총 결근 일수</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="icon-box green">
                                    <span className="material-symbols-outlined"
                                        style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
                                </div>
                            </div>
                            <div>
                                <p className="stat-value">94.8 <span className="stat-unit">%</span></p>
                                <p className="stat-label">근태 점수</p>
                            </div>
                        </div>
                    </div>

                    {/* 근태 이력 테이블 */}
                    <div className="table-container">
                        <div className="table-header">
                            <div>
                                <h3>상세 근태 로그</h3>
                                <p>현재 정산 주기의 이력 데이터입니다.</p>
                            </div>
                        </div>
                        <div style={{ overflowX: "auto" }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>날짜</th>
                                        <th>직원 ID</th>
                                        <th>출근 시각</th>
                                        <th>퇴근 시각</th>
                                        <th>근무 시간</th>
                                        <th className="text-center">상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="date-cell">
                                                <span className="date-primary">2026년 3월 27일</span>
                                                <span className="date-secondary">목요일</span>
                                            </div>
                                        </td>
                                        <td className="time-cell">08:54 AM</td>
                                        <td className="time-cell">06:12 PM</td>
                                        <td className="time-cell">9시간 18분</td>
                                        <td className="text-center">
                                            <span className="status-badge status-normal">정상</span>
                                        </td>
                                        <td className="text-right">
                                            <button className="btn-icon">
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="date-cell">
                                                <span className="date-primary">2026년 3월 26일</span>
                                                <span className="date-secondary">수요일</span>
                                            </div>
                                        </td>
                                        <td className="time-cell">09:42 AM</td>
                                        <td className="time-cell">06:05 PM</td>
                                        <td className="time-cell">8시간 23분</td>
                                        <td className="text-center">
                                            <span className="status-badge status-late">지각</span>
                                        </td>
                                        <td className="text-right">
                                            <button className="btn-icon">
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="date-cell">
                                                <span className="date-primary">2026년 3월 25일</span>
                                                <span className="date-secondary">화요일</span>
                                            </div>
                                        </td>
                                        <td className="time-cell">08:58 AM</td>
                                        <td className="time-cell">06:00 PM</td>
                                        <td className="time-cell">9시간 02분</td>
                                        <td className="text-center">
                                            <span className="status-badge status-normal">정상</span>
                                        </td>
                                        <td className="text-right">
                                            <button className="btn-icon">
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default withPageStyle(AttendanceManagement, "dashboard.css", pageCss);
