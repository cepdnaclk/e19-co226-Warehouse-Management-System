import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaCubes,
    FaSignOutAlt // Import the logout icon
} from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
        
    };

    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/customers",
            name: "Customers",
            icon: <FaUserAlt />
        },
        {
            path: "/product",
            name: "Product",
            icon: <FaShoppingBag />
        },
        {
            path: "/inventory",
            name: "Inventory",
            icon: <FaCubes />
        },
        {
            path: "/orders",
            name: "Orders",
            icon: <FaThList />
        }
    ];

    return (
        <div className="container">
            <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Warehouse Management System</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
                {/* Logout Button */}
                <div className="link" onClick={handleLogout}>
                    <div className="icon"><FaSignOutAlt /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Logout</div>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
