'use client'
import { useState } from 'react';
import { EllipsisHorizontalIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { deleteTravel } from '@/app/lib/actions';


export function DropDownTravelMenu({ id }: { id: string }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const deleteTravelWithId = deleteTravel.bind(null, id);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="relative">
            <button onClick={toggleMenu}>
                <EllipsisHorizontalIcon className='size-6 ' />
            </button>
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="m-8">
                        <a href={`/profile/travels/${id}/edit`}>
                            <div className='flex justify-between items-center'>
                                <span className='text-custom-medium-blue'>Editar publicação</span>
                                <ChevronRightIcon className='size-6 text-custom-medium-blue' />
                            </div>

                        </a>
                        <div className='border mt-2 mb-2' />
                        <form className="flex justify-between items-center" action={deleteTravelWithId}>
                            <button className="text-custom-medium-blue">
                                <span className='text-custom-medium-blue'>Excluir publicação</span>
                            </button>
                            <ChevronRightIcon className='size-6 text-custom-medium-blue' />
                        </form>
                        <div className='border mt-2 mb-2' />
                        <a href={`/profile/travels/${id}/posts`}>
                            <div className='flex justify-between items-center'>
                                <span className='text-custom-medium-blue'>Ver postagens</span>
                                <ChevronRightIcon className='size-6 text-custom-medium-blue' />
                            </div>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
