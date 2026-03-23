import { useState, useEffect } from 'react';

const DepartmentModal = ({ isOpen, onClose, onSubmit, editData }) => {
    const [form, setForm] = useState({
        deptCode: '',
        deptName: '',
        managerId: '',
    });

    // 수정 시 기존 데이터 채우기
    useEffect(() => {
        if (editData) {
            setForm({
                deptCode: editData.deptCode || '',
                deptName: editData.deptName || '',
                managerId: editData.managerId || '',
            });
        } else {
            setForm({ deptCode: '', deptName: '', managerId: '' });
        }
    }, [editData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!form.deptCode.trim() || !form.deptName.trim()) {
            alert('부서 코드와 부서명은 필수입니다.');
            return;
        }
        onSubmit({
            deptCode: form.deptCode,
            deptName: form.deptName,
            managerId: form.managerId ? Number(form.managerId) : null,
        });
    };

    return (
        <div style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'white', borderRadius: '16px',
                padding: '32px', width: '400px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}>
                <h2 style={{ marginBottom: '24px' }}>
                    {editData ? '부서 수정' : '부서 추가'}
                </h2>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                        부서 코드 *
                    </label>
                    <input
                        name="deptCode"
                        value={form.deptCode}
                        onChange={handleChange}
                        placeholder="예: DEV"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                        부서명 *
                    </label>
                    <input
                        name="deptName"
                        value={form.deptName}
                        onChange={handleChange}
                        placeholder="예: 개발팀"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                        부서장 ID (선택)
                    </label>
                    <input
                        name="managerId"
                        value={form.managerId}
                        onChange={handleChange}
                        placeholder="직원 ID 입력"
                        type="number"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '10px 20px', borderRadius: '8px',
                            border: '1px solid #ddd', background: 'white', cursor: 'pointer'
                        }}
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: '10px 20px', borderRadius: '8px',
                            border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer'
                        }}
                    >
                        {editData ? '수정' : '추가'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepartmentModal;