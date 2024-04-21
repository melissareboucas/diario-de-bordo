import TopMenu from "@/app/ui/topMenu"
import { Suspense } from "react"
import BackLink from "@/app/ui/backlink"
import TopPage from "@/app/ui/topPage"
import Map from "@/app/ui/profile/map"
import TestForm from "@/app/ui/autocomplete/testeform"


export default function Countries() {

    return <>
        <Suspense>
            <TopMenu />
        </Suspense>
        <BackLink backToLink="/profile" backToText="Voltar para Home"/>
        <TopPage title="Países" img_url="/assets/travels-sm.png"/>
        <TestForm />
        <Map />
    </>
}