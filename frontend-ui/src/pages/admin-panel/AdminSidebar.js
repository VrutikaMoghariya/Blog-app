import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const AdminSidebar = () => {

    const navigate = useNavigate();
    const clickonLogout = () => {
        navigate('/login');
        localStorage.removeItem("Admin-token");
        localStorage.removeItem("Admin-data");
    }
    
    return (
        <>
            <div >
                <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-2 p-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
                    <div className="container-fluid">
                        <a href="/" className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0 logo-image theme-light-logo">
                            <img src="https://neon.gbjsolution.com/content/images/2022/12/logo-dark.svg" className='w-50' alt="Neon" />
                        </a>
                        <div className="collapse navbar-collapse" id="sidebarCollapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/admin/dashboard" className="nav-link">
                                        <i className="bi bi-house"></i> Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/dashboard" className="nav-link">
                                        <i className="bi bi-book"></i> Blog-posts
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/dashboard" className="nav-link">
                                        <i className="bi bi-bookmarks"></i> Category-tags
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin" className="nav-link">
                                        <i className="bi bi-people"></i> Users
                                    </Link>
                                </li>
                            </ul>
                            <hr className="navbar-divider my-5 opacity-20" />
                            <div className="mt-auto"></div>
                            <ul className="navbar-nav">
                                <li className="nav-item ">
                                    <Link to="/admin/create-Admin"  className="nav-link fs-5 border bg-light" >
                                        <i className="bi bi-plus me-3"></i> Create New Admin
                                    </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link to="/login" className="nav-link fs-5 border bg-light" onClick={clickonLogout}>
                                        <i className="bi bi-box-arrow-left me-3"></i> Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default AdminSidebar;
