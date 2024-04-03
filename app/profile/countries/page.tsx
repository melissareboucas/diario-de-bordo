import TopMenu from "@/app/ui/topMenu"
import { Suspense } from "react"


export default function Countries() {
    return <>
        <Suspense>
            <TopMenu />
        </Suspense>
        Countries
    </>
}