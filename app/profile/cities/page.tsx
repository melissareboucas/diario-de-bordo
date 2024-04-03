import TopMenu from "@/app/ui/topMenu"
import { Suspense } from "react"


export default function Cities() {
    return <>
        <Suspense>
            <TopMenu/>
        </Suspense>
        
        Cities
    </>
}