import TopMenu from "@/app/ui/topMenu";
import { Suspense } from "react";
import CreateTravelForm from "@/app/ui/travels/createTravelForm";

export default async function Create() {
    return (
        <main>
            <Suspense>
                <TopMenu enableSearch={false}/>
            </Suspense>
            <CreateTravelForm />
        </main>
    );
}