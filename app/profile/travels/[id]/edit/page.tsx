
import { fetchTravelById } from "@/app/lib/data";
import { Suspense } from "react";
import TopMenu from "@/app/ui/topMenu";
import EditTravelForm from "@/app/ui/travels/editTravelForm";

export default async function Edit({ params }: { params: { id: string } }) {
    const id = params.id;
    const [travel] = await Promise.all([
        fetchTravelById(id)
    ]);
    return (
        <>
            <Suspense>
                <TopMenu enableSearch={false}/>
            </Suspense>
            <EditTravelForm travel={travel} />
        </>
    );
}