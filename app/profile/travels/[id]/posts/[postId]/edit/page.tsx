
import { fetchPostById } from "@/app/lib/data";
import { Suspense } from "react";
import TopMenu from "@/app/ui/topMenu";
import EditPostForm from "@/app/ui/posts/editPostForm";

export default async function EditPost({ params }: { params: { postId: string } }) {
    const postId = params.postId;
    const [post] = await Promise.all([
        fetchPostById(postId)
    ]);
    return (
        <>
            <Suspense>
                <TopMenu enableSearch={false}/>
            </Suspense>
            <div>
                {post && ( // Only render if 'post' is defined
                    <>
                        <EditPostForm post={post}/>
                    </>
                )}
                {!post && ( // Render something when 'post' is undefined
                    <p>No post data available.</p>
                )}
            </div>

        </>
    );
}