import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { IoMenu } from "react-icons/io5";
import { isAuthenticated, getUser } from '../../Utils/AuthData';
import { useNavigate } from 'react-router';
import { FiUser } from 'react-icons/fi';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = isAuthenticated();
    const user = getUser();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="h-[10dvh] flex items-center px-8 justify-between bg-base-300 relative">
            <div className="h-full aspect-w[240] py-4 px-2">
                <h1 className='h-full w-full'>
                    <Link className='relative w-full h-full' to="/">
                        <>
                            <img src="/images/logo2.png" className="block dark:hidden h-full w-full" alt="Logo Light" />
                            <img src="/images/logo.png" className="hidden dark:block h-full w-full" alt="Logo Dark" />
                        </>
                    </Link>
                </h1>
            </div>
            
            {/* Desktop Menu */}
            <ul className="hidden sm:flex gap-3 menu menu-horizontal text-lg font-medium">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/properties">Properties</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                {isLoggedIn ? (
                    <li className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 hover:bg-base-200 rounded-full p-2"
                        >
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary">
                                <FiUser size={20} />
                            </div>
                        </button>
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-8 w-48 bg-base-100 rounded-lg shadow-lg py-2 z-[9999]">
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-base-200"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>

            {/* Mobile Menu */}
            <div className="drawer z-[9999] drawer-end sm:hidden">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ml-auto">
                    <label htmlFor="my-drawer-4" className="drawer-button">
                        <IoMenu className='text-4xl' />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu gap-2 bg-base-200 text-base-content min-h-full w-60 text-lg p-4">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/properties">Properties</Link></li>
                        <li><Link to="/manoram-nagri-services">Shankar Nagar</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        {isLoggedIn ? (
                            <>
                                <li className="border-t border-base-300 pt-2 mt-2">
                                    <div className="flex items-center gap-2 px-4 py-2">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary">
                                            <FiUser size={20} />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-base-200">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li><Link to="/login">Login</Link></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;