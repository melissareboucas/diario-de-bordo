import TopMenu from "@/app/components/topMenu"
import { Suspense } from "react"


export default function Countries() {
    return <>
        <Suspense>
            <TopMenu />
        </Suspense>
        Countries
    </>
}