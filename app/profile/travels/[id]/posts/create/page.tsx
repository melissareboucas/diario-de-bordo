import { fetchPostsByTravelId, fetchTravelById } from "@/app/lib/data";
import { Suspense } from "react";
import TopMenu from "@/app/ui/topMenu";


export default async function CreatePost({ params }: { params: { id: string } }) {
    const id = params.id;
    const [travel, posts] = await Promise.all([
        fetchTravelById(id),
        fetchPostsByTravelId(id)
    ]);
    return (
        <>
            <Suspense>
                <TopMenu />
            </Suspense>

            Criar post

        </>
    );
}