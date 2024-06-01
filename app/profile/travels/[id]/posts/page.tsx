import { fetchPostsByTravelId, fetchTravelById } from "@/app/lib/data";
import { Suspense } from "react";
import TopMenu from "@/app/ui/topMenu";
import { formatDateToLocal } from "@/app/lib/utils";
import { DropDownPostMenu } from "@/app/ui/posts/dropDownPostMenu";
import BackLink from "@/app/ui/backlink";
import { AddButton } from "@/app/ui/travels/addButton";

export default async function Posts({ params }: { params: { id: string } }) {
    const travels_id = params.id;
    const [travel, posts] = await Promise.all([
        fetchTravelById(travels_id),
        fetchPostsByTravelId(travels_id)
    ]);
    return (
        <>
            <Suspense>
                <TopMenu enableSearch={false}/>
            </Suspense>

            <BackLink backToLink="/profile/travels" backToText="Voltar para Viagens"/>

            <div className="flex flex-grow justify-between items-center mr-16 ml-16 ">
                <span className="font-semibold text-custom-dark-blue text-4xl ">
                    {travel.destinycity}, {travel.destinycountry}
                </span>
                <span className="text-custom-dark-blue text-md">
                    {formatDateToLocal(travel.date)}
                </span>
            </div>
            <div className="mt-2 flex justify-end">
                <AddButton sendToLink={`/profile/travels/${travel.id}/posts/create`} buttonText='Adicionar diário de bordo'/>
            </div>

            {posts.length === 0 && (
                <div className="flex justify-center mt-10">
                    <a className="text-custom-dark-blue text-lg" href={`/profile/travels/${travels_id}/posts/create`}>Crie a primeira postagem!</a>
                </div>
            )}

            {posts?.map((post) => (
                <div key={post.id} className='shadow-lg mr-64 ml-64 mt-16 max-h-[510px] mb-16 relative border'>
                    <div className='flex flex-col justify-end items-end absolute top-0 right-0 text-custom-dark-blue m-4'>
                        <div>
                            {formatDateToLocal(post.postdate)}
                        </div>
                        <DropDownPostMenu id={post.id} travels_id={post.travels_id} />

                    </div>
                    <div className='flex gap-2 m-8 items-center'>
                        <h1 className='font-semibold text-custom-dark-blue text-2xl'>{post.title}</h1>
                    </div>
                    <div className='ml-8 mr-8 mb-2 max-h-[150px] overflow-y-auto'>
                        <p className='text-custom-medium-blue'>{post.posttext}</p>
                    </div>

                </div>))}

        </>
    );
}