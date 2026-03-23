const DepartmentTable = ({ departments, onEdit, onDelete }) => {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table>
                <thead>
                    <tr>
                        <th style={{ paddingLeft: '32px' }}>부서 코드</th>
                        <th>부서명</th>
                        <th>인원</th>
                        <th>관리자</th>
                        <th style={{ textAlign: 'right', paddingRight: '32px' }}>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.length === 0 ? (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '32px' }}>
                                부서 데이터가 없습니다.
                            </td>
                        </tr>
                    ) : (
                        departments.map((dept) => (
                            <tr key={dept.departmentId}>
                                <td style={{ paddingLeft: '32px' }}>
                                    <span className="dept-code">{dept.deptCode}</span>
                                </td>
                                <td>
                                    <div className="dept-info-name">{dept.deptName}</div>
                                </td>
                                <td>
                                    <span style={{ fontSize: '14px', fontWeight: 500 }}>
                                        {dept.memberCount ?? 0}
                                    </span>
                                </td>
                                <td>
                                    {dept.managerName ? (
                                        <div className="manager-cell">
                                            <div className="initial-box">
                                                {dept.managerName.slice(0, 2)}
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: 600 }}>
                                                {dept.managerName}
                                            </div>
                                        </div>
                                    ) : (
                                        <span style={{ color: 'var(--on-surface-variant)', fontSize: '13px' }}>
                                            미지정
                                        </span>
                                    )}
                                </td>
                                <td style={{ textAlign: 'right', paddingRight: '32px' }}>
                                    <button
                                        onClick={() => onEdit(dept)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px' }}
                                    >
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                    <button
                                        onClick={() => onDelete(dept.departmentId)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentTable;