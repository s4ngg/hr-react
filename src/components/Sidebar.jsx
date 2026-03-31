import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Sidebar() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const role = user?.role;

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-box">
                    <div className="logo-icon">
                        <span className="material-symbols-outlined">architecture</span>
                    </div>
                    <div className="logo-text">
                        <h2>경영진 포털</h2>
                        <p>글로벌 HR 시스템</p>
                    </div>
                </div>
            </div>

            <nav className="sidebar-nav">
                {role === "ADMIN" && (
                    <>
                        <Link className="nav-link" to="/dashboard">대시보드</Link>
                        <Link className="nav-link" to="/employee-management">직원 관리</Link>
                        <Link className="nav-link" to="/department-management">부서 관리</Link>
                    </>
                )}

                <Link className="nav-link" to="/attendance-management">근태 관리</Link>
                <Link className="nav-link" to="/vacation-management">휴가 관리</Link>
                <Link className="nav-link" to="/member-edit">내 정보 수정</Link>
            </nav>

            <div className="sidebar-footer">
                <button type="button" className="nav-link logout" onClick={handleLogout}>
                    로그아웃
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;