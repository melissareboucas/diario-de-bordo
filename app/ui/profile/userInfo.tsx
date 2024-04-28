
import { User } from '@/app/lib/definitions';

import { AddButton } from '../travels/addButton';


import Map from "@/app/ui/profile/map"
import { fetchAllPathsCoordenates, fetchMostPopularOriginCoordenates } from "@/app/lib/data"
import { Paths, MostPopularOrigin } from "@/app/lib/definitions"



export default async function UserInfo({
    user
}: {
    user: User;
}) {

    const origin = await fetchMostPopularOriginCoordenates(user.id) as MostPopularOrigin[]

    const paths = await fetchAllPathsCoordenates(user.id) as Paths[]

    return (
        <>
            <div className="container relative px-4 py-4 w-200 ">
                {origin.length > 0 && paths.length > 0 && (
                    <Map origin={origin[0]} paths={paths} />
                )}
                {(origin.length == 0 || paths.length == 0) && (
                    <div className="container relative px-4 py-4 w-200 ">
                        <img src="/assets/worldmap.png" className="w-full" alt="World Map"></img>
                    </div>
                )}
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
                <AddButton sendToLink='/profile/travels/create' buttonText='Adicionar viagem' />

            </div>

        </>
    );
}
