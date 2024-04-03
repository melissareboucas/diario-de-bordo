import TopMenu from "@/app/ui/topMenu"
import { Suspense } from "react"
import BackLink from "@/app/ui/backlink"
import TopPage from "@/app/ui/topPage"


export default function Cities() {
    return <>
        <Suspense>
            <TopMenu />
        </Suspense>
        <BackLink />
        <TopPage title="Cidades" img_url="/assets/travels-sm.png" />
    </>
}