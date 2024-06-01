'use client'
import TopMenu from "@/app/ui/topMenu"
import { Suspense } from "react"
import BackLink from "@/app/ui/backlink"
import TopPage from "@/app/ui/topPage"


export default function Community() {

    return <>
        <Suspense>
            <TopMenu enableSearch={false} />
        </Suspense>
        <BackLink backToLink="/profile" backToText="Voltar para Home" />
        <TopPage title="Comunidade" img_url="/assets/community-sm.png" />

        <h1 className="flex justify-center items-center py-16 ">Essa funcionalidade será lançada em breve!</h1>


    </>
}