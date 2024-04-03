"use client"

import TopMenu from "@/app/ui/topMenu";
import { createTravel } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Suspense } from "react";

export default async function Create() {
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createTravel, initialState);
    return (
        <main>
            <Suspense>
                <TopMenu />
            </Suspense>

            <div className="w-128 h-[600px] m-4 border border-custom-medium-blue  rounded-3xl">
                <div className="m-10 text-custom-dark-blue font-bold text-4xl">
                    Como foi sua viagem?
                </div>
                <div className="flex justify-between ml-10 mr-16">
                    <form action={dispatch} className="w-2/3">
                        <div className="mr-64">
                            {/*User Id, informação escondida que tem que ser enviada*/}
                            <input
                                id="user_id"
                                name="user_id"

                                placeholder="origincity"
                                type="hidden"
                                readOnly
                                value={"410544b2-4001-4271-9855-fec4b6a6442a"}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />

                            {/* Origem */}
                            <div className="flex gap-4 mt-8">
                                <input
                                    id="origincity"
                                    name="origincity"
                                    type="string"
                                    placeholder="Saindo de: Cidade"
                                    className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "
                                />
                                <input
                                    id="origincountry"
                                    name="origincountry"
                                    type="string"
                                    placeholder="Saindo de: País"
                                    className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "
                                />
                            </div>

                            {/* destino */}
                            <div className="flex gap-4 mt-8">
                                <input
                                    id="destinycity"
                                    name="destinycity"
                                    type="string"
                                    placeholder="Chegando em: Cidade"
                                    className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "
                                />
                                <input
                                    id="destinycountry"
                                    name="destinycountry"
                                    type="string"
                                    placeholder="Chegando em: País"
                                    className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "
                                />
                            </div>

                            {/* Distância */}
                            <div className="mt-8">
                                <input
                                    id="distanceinmeters"
                                    name="distanceinmeters"
                                    type="string"
                                    placeholder="Distância (em metros)"
                                    className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "
                                />
                            </div>

                            {/* Comentário */}
                            <div className="mt-8">
                                <textarea
                                    id="comment"
                                    name="comment"
                                    placeholder="Comentário"
                                    className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "
                                />
                            </div>


                            <div className="mt-6 flex justify-start gap-4">
                                <a
                                    href="/profile/travels"
                                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 focus:outline-custom-medium-blue"
                                >
                                    Cancelar
                                </a>
                                <button type="submit" className="flex h-10 items-center rounded-lg bg-custom-medium-blue px-4 text-sm font-medium text-white transition-colors hover:bg-custom-light-blue focus:outline-custom-medium-blue">Adicionar</button>
                            </div>
                        </div>
                    </form>
                    <img src="/assets/addImage.png" style={{ width: '400px', height: '450px' }} ></img>
                </div>

            </div>




        </main>
    );
}