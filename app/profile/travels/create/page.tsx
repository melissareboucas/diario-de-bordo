import TopMenu from "@/app/ui/topMenu";
import { Suspense } from "react";
import TravelForm from "@/app/ui/travels/travelForm";

export default async function Create() {
    return (
        <main>
            <Suspense>
                <TopMenu />
            </Suspense>
            <TravelForm />
        </main>
    );
}