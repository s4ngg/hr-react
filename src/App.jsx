import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeManagement from "./pages/EmployeeManagement.jsx";
import EmployeeCreate from "./pages/EmployeeCreate.jsx";
import EmployeeEdit from "./pages/EmployeeEdit.jsx";
import DepartmentManagement from "./pages/DepartmentManagement.jsx";
import DepartmentCreate from "./pages/DepartmentCreate.jsx";
import DepartmentEdit from "./pages/DepartmentEdit.jsx";
import AttendanceManagement from "./pages/AttendanceManagement.jsx";
import VacationManagement from "./pages/VacationManagement.jsx";
import VacationRequest from "./pages/VacationRequest.jsx";
import VacationRequestList from "./pages/VacationRequestList.jsx";
import MemberEdit from "./pages/MemberEdit.jsx";
import Login from "./pages/Login.jsx";
import FindPassword from "./pages/FindPassword.jsx";
import ItContact from "./pages/ItContact.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 경로 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 로그인 없이 접근 가능한 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/it-contact" element={<ItContact />} />

        {/* ADMIN 전용 */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee-management"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <EmployeeManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <EmployeeCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-edit"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <EmployeeEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/department-management"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <DepartmentManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department-create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <DepartmentCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department-edit/:departmentId"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <DepartmentEdit />
            </ProtectedRoute>
          }
        />

        {/* ADMIN, USER 공통 */}
        <Route
          path="/attendance-management"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <AttendanceManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vacation-management"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <VacationManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vacation-request"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <VacationRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vacation-request-list"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <VacationRequestList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member-edit"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <MemberEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;