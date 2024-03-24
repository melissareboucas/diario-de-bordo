
import { User } from '@/app/lib/definitions';

import {
    ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';

export default function UserInfo({
    user
}: {
    user: User;
}) {
    function handleOpenMap() {
        console.log("abriu mapa")
    }
    return (
        <>
            <div className="container relative px-4 py-4 w-200 ">
                <img src="/assets/worldmap.png" className="w-full" alt="World Map"></img>
                <ArrowsPointingOutIcon
                    className="w-16 absolute bottom-0 right-0 p-4"
                    onClick={() => {
                        handleOpenMap();
                    }}
                />
            </div>
            <div className='flex items-center justify-between px-4'>
                <div className="absolute top-80 ml-10">
                    <img
                        src={user.image_url}
                        alt={user.name}
                        className='rounded-full border border-4 border-custom-medium-blue'
                        style={{ width: '210px', height: '210px' }} />
                </div>
                
                <div className="ml-64 flex flex-col gap-2">
                    <p className='text-custom-medium-blue'>{user.email}</p>
                    <p className='text-custom-dark-blue text-2xl'>{user.name}</p>
                </div>
                <button className='mr-16 text-custom-dark-blue border border-md rounded-lg px-4 py-2 border-custom-medium-blue'>Adicionar diário de bordo</button>
            </div>
        </>
    );
}
