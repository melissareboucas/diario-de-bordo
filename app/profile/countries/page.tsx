import TopMenu from "@/app/ui/topMenu"
import { Suspense } from "react"
import BackLink from "@/app/ui/backlink"
import TopPage from "@/app/ui/topPage"
import Map from "@/app/ui/profile/map"
import { fetchAllPathsCoordenates, fetchMostPopularOriginCoordenates } from "@/app/lib/data"
import { Paths, MostPopularOrigin } from "@/app/lib/definitions"

import {
    ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';


export default async function Countries() {

    const origin = await fetchMostPopularOriginCoordenates('410544b2-4001-4271-9855-fec4b6a6442a') as MostPopularOrigin[]

    const paths = await fetchAllPathsCoordenates('410544b2-4001-4271-9855-fec4b6a6442a') as Paths[]

    return <>

        <Suspense>
            <TopMenu enableSearch={false}/>
        </Suspense>
        <BackLink backToLink="/profile" backToText="Voltar para Home" />
        <TopPage title="Países" img_url="/assets/travels-sm.png" />


        {origin.length > 0 && paths.length > 0 && (
            <Map origin={origin[0]} paths={paths} />
        )}
        {(origin.length == 0 || paths.length == 0) && (
            <div className="container relative px-4 py-4 w-200 ">
                <img src="/assets/worldmap.png" className="w-full" alt="World Map"></img>
                <ArrowsPointingOutIcon
                    className="w-16 absolute bottom-0 right-0 p-4"

                />
            </div>
        )}


    </>
}