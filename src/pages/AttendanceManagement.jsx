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

    return (
        <>
            <Sidebar />
            <Header />
            <main>
                <div className="page-header">
                    <div className="page-title">
                        <nav className="breadcrumbs">
                            <span>운영 포털</span>
                            <span style={{ color: "var(--outline-variant)" }}>/</span>
                            <span className="active-crumb">근태 관리</span>
                        </nav>
                        <h1>근태 관리</h1>
                        <p>직원들의 근태 관리 메뉴입니다.</p>
                    </div>
                </div>
                <div className="content-canvas">

                    {/* 출근/퇴근 버튼 카드 */}
                    <div className="card attendance-card" style={{ marginBottom: "24px" }}>
                        <div>
                            <div className="card-label-row">
                                <span className="card-label">근태 현황</span>
                                <div className="status-badge">
                                    <span className="dot" />
                                    {todayAttendance ? (todayAttendance.checkOut ? "퇴근" : "출근중") : "미출근"}
                                </div>
                            </div>
                            <p className="time-display">
                                {todayAttendance?.checkIn ?? "--:--"}
                            </p>
                            <p className="date-sub">
                                {new Date().toLocaleDateString("ko-KR")}
                            </p>
                        </div>
                        <div className="btn-group">
                            <button
                                className={!todayAttendance ? "btn btn-primary" : "btn btn-disabled"}
                                disabled={!!todayAttendance}
                                onClick={handleCheckIn}
                            >
                                <span className="material-symbols-outlined">login</span>
                                출근하기
                            </button>
                            <button
                                className={todayAttendance && !todayAttendance.checkOut ? "btn btn-primary" : "btn btn-disabled"}
                                disabled={!todayAttendance || !!todayAttendance.checkOut}
                                onClick={handleCheckOut}
                            >
                                <span className="material-symbols-outlined">logout</span>
                                퇴근하기
                            </button>
                        </div>
                    </div>

                    {/* 근태 이력 테이블 */}
                    <div className="table-container">
                        <div className="table-header">
                            <div>
                                <h3>근태 이력</h3>
                                <p>전체 근태 기록입니다.</p>
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
                                    {attendances.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: "center" }}>근태 기록이 없습니다.</td>
                                        </tr>
                                    ) : (
                                        attendances.map((a) => (
                                            <tr key={a.attendanceId}>
                                                <td>{a.workDate}</td>
                                                <td>{a.memberId}</td>
                                                <td className="time-cell">{a.checkIn ?? '-'}</td>
                                                <td className="time-cell">{a.checkOut ?? '-'}</td>
                                                <td className="time-cell">{a.workHours ? `${a.workHours}시간` : '-'}</td>
                                                <td className="text-center">
                                                    <span className={`status-badge status-${
                                                        a.status === '정상' ? 'normal' :
                                                        a.status === '지각' ? 'late' : 'overtime'
                                                    }`}>{a.status ?? '-'}</span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
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
