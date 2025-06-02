import React, { useRef, useState } from 'react';
import { Link } from 'react-router';
import { mutate } from 'swr';
import { FaUserAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import Modal from '../Modal/Modal';
import AddPropertyPage from '../../Pages/AddProperty/AddPropertyPage';


const Navbar = () => {

    const addPropertyRef = useRef(null)

    const handleLogOut = () => {
        localStorage.removeItem('user');
        mutate('userAuthData');
    }
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="h-[10dvh] flex items-center px-8 justify-between bg-base-300">
            <div className="h-full aspect-w[240] py-4 px-2">
                <h1 className='h-full w-full'> <Link className='relative w-full h-full' to="/"><>
    <img src="/images/logo2.png" className="block dark:hidden h-full w-full" alt="Logo Light" />
    <img src="/images/logo.png" className="hidden dark:block h-full w-full" alt="Logo Dark" />
</>
</Link></h1>
            </div>
            <ul className="hidden sm:flex gap-3 menu menu-horizontal text-lg font-medium">
                <li><Link to="/properties">Properties</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><button type='button' onClick={() => addPropertyRef.current.showModal()}>Add Property</button></li>
                <button className='flex justify-center items-center' popoverTarget="profileMenu" style={{ anchorName: "--anchor-1" }}>
                    <FaUserAlt className='bg-base-content rounded-full cursor-pointer text-base-100 p-1 text-3xl' />
                </button>
                <ul className="dropdown dropdown-end menu w-52 rounded-box bg-base-100 shadow-lg" popover="auto" id="profileMenu" style={{ positionAnchor: "--anchor-1" }}>
                    <li><button onClick={() => handleLogOut()} type='button'>Log Out</button></li>
                </ul>
            </ul>

            <div className="drawer z-10 drawer-end sm:hidden">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ml-auto">
                    <label htmlFor="my-drawer-4" className="drawer-button"><IoMenu className='text-4xl' /></label>
                </div>
                <div className="drawer-side drawer-open">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu gap-2 bg-base-200 text-base-content min-h-full w-60 text-lg p-4">
                        <li><Link to="/properties" >Properties</Link></li>
                        <li><Link to="/contact" >Contact</Link></li>
                        <li><button type='button' onClick={() => addPropertyRef.current.showModal()}  >Add Property</button></li>
                        <li><button onClick={() => setShowMenu(v => !v)} type='button'>Profile</button></li>
                        <ul className={`bg-base-300 card w-full ${showMenu ? '' : 'hidden'} menu font-medium`}>
                            <li><button onClick={() => handleLogOut()} type='button' className='bg-base-100'>Log Out</button></li>
                        </ul>
                    </ul>
                </div>
            </div>

            <Modal ref={addPropertyRef} className="w-full max-w-none h-full">
                <AddPropertyPage ref={addPropertyRef} />
            </Modal>
        </nav>
    );
};

export default Navbar;