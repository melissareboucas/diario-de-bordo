import TopMenu from "@/app/ui/topMenu"
import { Suspense } from "react"
import BackLink from "@/app/ui/backlink"
import TopPage from "@/app/ui/topPage"


export default function Community() {
    return <>
        <Suspense>
            <TopMenu enableSearch={false}/>
        </Suspense>
        <BackLink backToLink="/profile" backToText="Voltar para Home"/>
        <TopPage title="Comunidade" img_url="/assets/travels-sm.png" />
    </>
}