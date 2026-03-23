import { useState } from 'react';
import DepartmentTable from '../components/department/DepartmentTable';
import DepartmentModal from '../components/department/DepartmentModal';
import {
    useDepartmentList,
    useSearchDepartment,
    useCreateDepartment,
    useUpdateDepartment,
    useDeleteDepartment,
} from '../query/departmentQuery';

const DepartmentPage = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null); // null이면 추가, 값 있으면 수정

    // 검색어 없으면 전체 목록, 있으면 검색 결과
    const { data: allDepts = [], isLoading } = useDepartmentList();
    const { data: searchedDepts = [] } = useSearchDepartment(searchKeyword);

    const departments = searchKeyword ? searchedDepts : allDepts;

    const { mutate: create } = useCreateDepartment();
    const { mutate: update } = useUpdateDepartment();
    const { mutate: remove } = useDeleteDepartment();

    // 추가 버튼
    const handleAddClick = () => {
        setEditData(null);
        setIsModalOpen(true);
    };

    // 수정 버튼
    const handleEdit = (dept) => {
        setEditData(dept);
        setIsModalOpen(true);
    };

    // 삭제 버튼
    const handleDelete = (departmentId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            remove(departmentId);
        }
    };

    // 모달 제출 (추가 or 수정)
    const handleSubmit = (formData) => {
        if (editData) {
            update(
                { departmentId: editData.departmentId, dto: formData },
                { onSuccess: () => setIsModalOpen(false) }
            );
        } else {
            create(formData, { onSuccess: () => setIsModalOpen(false) });
        }
    };

    if (isLoading) return <div>로딩 중...</div>;

    return (
        <main>
            {/* 페이지 헤더 */}
            <section className="page-intro">
                <div className="page-title-section">
                    <nav className="breadcrumbs">
                        <span>운영 포털</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '10px' }}>chevron_right</span>
                        <span className="active-crumb">조직 관리</span>
                    </nav>
                    <h1>부서 관리</h1>
                    <p>부서의 경계를 정의하고 리더를 배정하며 전체 조직의 리소스 분포를 모니터링합니다.</p>
                </div>
                <button className="btn-add" onClick={handleAddClick}>
                    <span className="material-symbols-outlined">add</span>
                    부서 추가
                </button>
            </section>

            {/* 통계 카드 */}
            <section className="stats-row">
                <div className="stat-card wide interactive">
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="stat-label">전체 부서 수</span>
                            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>analytics</span>
                        </div>
                        <div className="stat-value">{allDepts.length}</div>
                    </div>
                    <p className="stat-desc">전역에서 활성화된 부서</p>
                </div>
            </section>

            {/* 테이블 */}
            <section className="table-card">
                <div className="table-header">
                    <div className="search-box">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>
                            search
                        </span>
                        <input
                            placeholder="부서 필터링..."
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </div>
                </div>

                <DepartmentTable
                    departments={departments}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </section>

            {/* 모달 */}
            <DepartmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                editData={editData}
            />
        </main>
    );
};

export default DepartmentPage;