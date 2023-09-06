import React from 'react';

const AdminHeader = ({ admin }) => {
    return (
        <>
            <header className="bg-surface-primary border-bottom pt-1">
                <div className="container-fluid">
                    <div className="mb-npx">
                        <ul className="nav nav-tabs mt-4 overflow-x border-0">
                            <li className="nav-item ">
                                <a href="/" className="nav-link active px-2">
                                    <i className="bi bi-house"></i> Dashboard
                                </a>
                            </li>
                            <li className="nav-item ms-auto">
                                <div className="avatar-parent-child fs-3 me-2">
                                    <i className="bi-person-circle me-2"></i> {admin.name}
                                </div>
                            </li>
                        </ul>

                    </div>

                </div>
            </header>
        </>
    );
};

export default AdminHeader;
