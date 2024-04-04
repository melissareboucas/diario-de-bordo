
import { fetchTravelById } from "@/app/lib/data";
import EditTravelForm from "@/app/ui/travels/editTravelForm";
import { Suspense } from "react";
import TopMenu from "@/app/ui/topMenu";

export default async function Edit({ params }: { params: { id: string } }) {
    const id = params.id;
    const [travel] = await Promise.all([
        fetchTravelById(id)
    ]);
    return (
        <>
            <Suspense>
                <TopMenu />
            </Suspense>
            <EditTravelForm travel={travel} />
        </>
    );
}