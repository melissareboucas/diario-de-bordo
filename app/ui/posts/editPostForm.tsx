

import { PostForm } from '@/app/lib/definitions';
import { updatePost } from '@/app/lib/actions';

export default function EditPostForm({
    post
}: {
    post: PostForm;
}) {

    const updatePostWithId = updatePost.bind(null, post.id);
    return (
        <div className="w-128 h-[600px] m-4 border border-custom-medium-blue  rounded-3xl">
            <div className="m-10 text-custom-dark-blue font-bold text-4xl">
                Editar Detalhes
            </div>
            <div className="flex justify-between ml-10 mr-16">
                <form action={updatePostWithId} className="w-2/3">
                    <div className="mr-64">
                        <input type="hidden" name="id" value={post.id} />
                        <input type="hidden" name="user_id" value={post.user_id} />
                        <input type="hidden" name="travels_id" value={post.travels_id} />
                        <input type="hidden" name="postdate" value={post.postdate} />

                        {/* Título */}
                        <div className="flex gap-4 mt-8">
                            <input
                                id="title"
                                name="title"
                                type="string"
                                defaultValue={post.title}
                                placeholder="Título"
                                className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "
                            />
                        </div>

                        {/* posttext */}
                        <div className="flex gap-4 mt-8">
                            <textarea
                                id="posttext"
                                name="posttext"
                                defaultValue={post.posttext}
                                className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue pl-10 pr-10 pt-2 pb-40 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue"
                            />
                        </div>

                        <div className="mt-6 flex justify-start gap-4">
                            <a
                                href={`/profile/travels/${post.travels_id}/posts`}
                                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 focus:outline-custom-medium-blue"
                            >
                                Cancelar
                            </a>
                            <button type="submit" className="flex h-10 items-center rounded-lg bg-custom-medium-blue px-4 text-sm font-medium text-white transition-colors hover:bg-custom-light-blue focus:outline-custom-medium-blue">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}
