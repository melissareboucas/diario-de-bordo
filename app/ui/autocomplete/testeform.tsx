"use client"
import SearchAutocomplete from "@/app/ui/autocomplete/searchAutocomplete"
import { createTravelV2 } from '@/app/lib/actions';
import { useState } from "react";


export default function TestForm() {
    const [origincity, setOrigincity] = useState('')
    const [origincountry, setOrigincountry] = useState('')
    const [destinycity, setDestinycity] = useState('')
    const [destinycountry, setDestinycountry] = useState('')
    const [distanceinmeters, setDistanceinmeters] = useState(0)
    const [description, setDescription] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const entries = formData.entries();
        let pair = entries.next();

        while (!pair.done) {
            const [key, value] = pair.value;
            console.log(key + ': ' + value);
            pair = entries.next();
        }

        createTravelV2(origincity, origincountry, destinycity, destinycountry, 1, 'e')
    };

    const handleSelectOrigin = (city: string, country: string) => {
        setOrigincity(city);
        setOrigincountry(country);
        console.log(city, country)
    };

    const handleSelectDestiny = (city: string, country: string) => {
        setDestinycity(city);
        setDestinycountry(country);
        console.log(city, country)
    };



    return (
        <>
            <form onSubmit={handleSubmit} className="w-2/3">
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

                    {/*ImageUrl, informação mocada que tem que ser enviada*/}
                    <input
                        id="travelimage"
                        name="travelimage"

                        placeholder="travelimage"
                        type="hidden"
                        readOnly
                        value={"/assets/sp.png"}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />

                    <div className="flex gap-4 mt-8">
                    <SearchAutocomplete onSelect={handleSelectOrigin} placeHolderText="Origem da viagem" />
                    <SearchAutocomplete onSelect={handleSelectDestiny} placeHolderText="Destino da viagem"/>
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

                    {/* Descrição */}
                    <div className="mt-8">
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Descrição"
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
        </>
    );
}