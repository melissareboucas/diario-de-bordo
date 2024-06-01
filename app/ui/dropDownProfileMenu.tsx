'use client'
import { useState } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { logout } from '@/app/lib/actions';


export function DropDownProfileMenu() {
    const [menuOpen, setMenuOpen] = useState(false);

    function handleLogout() {
        logout();
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="relative">
            <button onClick={toggleMenu}>
                <EllipsisHorizontalIcon className='size-6 ' />
            </button>
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="m-8">
                        <div className='border mt-2 mb-2' />
                            <form className="flex justify-between items-center" action={handleLogout}>
                                <button className="text-custom-medium-blue">
                                    <span className='text-custom-medium-blue'>Logout</span>
                                </button>
                            </form>
                        <div className='border mt-2 mb-2' />
                    </div>
                </div>
            )}
        </div>
    );
}
