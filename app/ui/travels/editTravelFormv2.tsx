'use client'

import { TravelForm } from '@/app/lib/definitions';
import { updateTravel2 } from '@/app/lib/actions';
import { useState, useEffect, use } from 'react';
import { calculateDistance } from '@/app/lib/data';
import SearchAutocomplete from '../autocomplete/searchAutocomplete';

export default function EditTravelFormv2({
    travel
}: {
    travel: TravelForm;
}) {

    const [origincity, setOrigincity] = useState(travel.origincity)
    const [origincountry, setOrigincountry] = useState(travel.origincountry)
    const [destinycity, setDestinycity] = useState(travel.destinycity)
    const [destinycountry, setDestinycountry] = useState(travel.destinycountry)
    const [distanceinmeters, setDistanceinmeters] = useState(travel.distanceinmeters)
    const [description, setDescription] = useState(travel.description)
    const [originlat, setOriginlat] = useState(0)
    const [originlng, setOriginlng] = useState(0)
    const [destinylat, setDestinylat] = useState(0)
    const [destinylng, setDestinylng] = useState(0)


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateTravel2(travel.id, origincity, origincountry, destinycity, destinycountry, distanceinmeters, description);


    };

    useEffect(() => {
        const distanceInKm = calculateDistance(originlat, originlng, destinylat, destinylng)

        const distanceInMetersInteger = Math.round(distanceInKm * 1000)

        setDistanceinmeters(distanceInMetersInteger);

    }, [description]);

    const handleSelectOrigin = (city: string, country: string, lat: number, lng: number) => {
        setOrigincity(city);
        setOrigincountry(country);
        setOriginlat(lat);
        setOriginlng(lng)
    };

    const handleSelectDestiny = (city: string, country: string, lat: number, lng: number) => {
        setDestinycity(city);
        setDestinycountry(country);
        setDestinylat(lat);
        setDestinylng(lng)
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    return (
        <div className="w-128 h-[600px] m-4 border border-custom-medium-blue  rounded-3xl">
            <div className="m-10 text-custom-dark-blue font-bold text-4xl">
                Editar Detalhes
            </div>
            <div className="flex justify-between ml-10 mr-16">
                <form onSubmit={handleSubmit} className="w-2/3">
                    <div className="mr-64">
                        <input type="hidden" name="id" value={travel.id} />
                        <input type="hidden" name="user_id" value={travel.user_id} />
                        <input type="hidden" name="travelimage" value={travel.travelimage} />
                        <input type="hidden" name="date" value={travel.date} />

                        {/* Location */}
                        <div className="flex  gap-4 mt-8 justify-between">
                            <SearchAutocomplete onSelect={handleSelectOrigin} placeHolderText={travel.origincity} />
                            <SearchAutocomplete onSelect={handleSelectDestiny} placeHolderText={travel.destinycity} />
                        </div>

                        {/* Descrição */}
                        <div className="mt-8">
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Descrição"
                                className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "
                                onChange={handleChangeDescription}
                                defaultValue={travel.description}
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
