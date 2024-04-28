

import { TravelForm } from '@/app/lib/definitions';
import { updateTravel } from '@/app/lib/actions';

export default function EditTravelFormOutdated({
    travel
}: {
    travel: TravelForm;
}) {

    const updateTravelWithId = updateTravel.bind(null, travel.id);
    return (
        <div className="w-128 h-[600px] m-4 border border-custom-medium-blue  rounded-3xl">
            <div className="m-10 text-custom-dark-blue font-bold text-4xl">
                Editar Detalhes
            </div>
            <div className="flex justify-between ml-10 mr-16">
                <form action={updateTravelWithId} className="w-2/3">
                    <div className="mr-64">
                        <input type="hidden" name="id" value={travel.id} />
                        <input type="hidden" name="user_id" value={travel.user_id} />
                        <input type="hidden" name="travelimage" value={travel.travelimage} />
                        <input type="hidden" name="date" value={travel.date} />

                        {/* Origem */}
                        <div className="flex gap-4 mt-8">
                            <input
                                id="origincity"
                                name="origincity"
                                type="string"
                                defaultValue={travel.origincity}
                                placeholder="Saindo de: Cidade"
                                className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "
                            />
                            <input
                                id="origincountry"
                                name="origincountry"
                                type="string"
                                defaultValue={travel.origincountry}
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
                                defaultValue={travel.destinycity}
                                placeholder="Chegando em: Cidade"
                                className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "
                            />
                            <input
                                id="destinycountry"
                                name="destinycountry"
                                type="string"
                                defaultValue={travel.destinycountry}
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
                                defaultValue={travel.distanceinmeters}
                                placeholder="Distância (em metros)"
                                className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "
                            />
                        </div>

                        {/* Descrição */}
                        <div className="mt-8">
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Descrição"
                                defaultValue={travel.description}
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
                            <button type="submit" className="flex h-10 items-center rounded-lg bg-custom-medium-blue px-4 text-sm font-medium text-white transition-colors hover:bg-custom-light-blue focus:outline-custom-medium-blue">Salvar</button>
                        </div>
                    </div>
                </form>
                <img src="/assets/addImage.png" style={{ width: '400px', height: '450px' }} ></img>
            </div>

        </div>
    );
}
