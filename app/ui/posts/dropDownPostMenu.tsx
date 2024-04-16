'use client'
import { useState } from 'react';
import { EllipsisHorizontalIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { deletePost } from '@/app/lib/actions';

export function DropDownPostMenu({ id, travels_id }: { id: string, travels_id: string }) {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const deletePostWithId = deletePost.bind(null, id, travels_id);
    

    

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
                                <span className='text-custom-medium-blue'>Editar post</span>
                                <ChevronRightIcon className='size-6 text-custom-medium-blue' />
                            </div>

                        </a>
                        <div className='border mt-2 mb-2' />
                        <form className="flex justify-between items-center" action={deletePostWithId}>
                            <button className="text-custom-medium-blue">
                                <span className='text-custom-medium-blue'>Excluir post</span>
                            </button>
                            <ChevronRightIcon className='size-6 text-custom-medium-blue' />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
