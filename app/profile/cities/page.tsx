import TopMenu from "@/app/components/topMenu"
import { Suspense } from "react"


export default function Cities() {
    return <>
        <Suspense>
            <TopMenu/>
        </Suspense>
        
        Cities
    </>
}