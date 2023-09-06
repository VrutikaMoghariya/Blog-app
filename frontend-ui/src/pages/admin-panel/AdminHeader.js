import React from 'react';

const AdminHeader = () => {
    return (
        <>
            <header className="bg-surface-primary border-bottom pt-6">
                <div className="container-fluid">
                    <div className="mb-npx">
                        <ul className="nav nav-tabs mt-4 overflow-x border-0">
                            <li className="nav-item ">
                                <a href="/" className="nav-link active"> Users</a>
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link font-regular">Category</a>
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link font-regular">Blogs</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
};

export default AdminHeader;
