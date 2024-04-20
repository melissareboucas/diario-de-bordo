import { fetchTravelById } from "@/app/lib/data";
import { Suspense } from "react";
import TopMenu from "@/app/ui/topMenu";
import CreatePostForm from "@/app/ui/posts/createPostForm";


export default async function CreatePost({ params }: { params: { id: string } }) {
    const id = params.id;
    const [travel] = await Promise.all([
        fetchTravelById(id),
    ]);
    return (
        <>
            <Suspense>
                <TopMenu />
            </Suspense>

            <CreatePostForm travels_id={travel.id}/>

        </>
    );
}