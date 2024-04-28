'use client'

import { TravelForm } from '@/app/lib/definitions';
import { updateTravel2 } from '@/app/lib/actions';
import { useState, useEffect, use } from 'react';
import { calculateDistance } from '@/app/lib/data';
import SearchAutocomplete from '../autocomplete/searchAutocomplete';
import UploadImage from '../uploadImage';

export default function EditTravelForm({
    travel
}: {
    travel: TravelForm;
}) {

    const [origincity, setOrigincity] = useState(travel.origincity)
    const [origincountry, setOrigincountry] = useState(travel.origincountry)
    const [originlatitude, setOriginlatitude] = useState(travel.originlatitude)
    const [originlongitude, setOriginlongitude] = useState(travel.originlongitude)
    const [destinycity, setDestinycity] = useState(travel.destinycity)
    const [destinycountry, setDestinycountry] = useState(travel.destinycountry)
    const [destinylatitude, setDestinylatitude] = useState(travel.destinylatitude)
    const [destinylongitude, setDestinylongitude] = useState(travel.destinylongitude)
    const [distanceinmeters, setDistanceinmeters] = useState(travel.distanceinmeters)
    const [modal, setModal] = useState(travel.modal)
    const [description, setDescription] = useState(travel.description)
    const [travelimage, setTravelImage] = useState(travel.travelimage)




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateTravel2(travel.id, origincity, origincountry, originlatitude, originlongitude,
            destinycity, destinycountry, destinylatitude, destinylongitude,
            distanceinmeters, modal, travelimage, description);

    };

    useEffect(() => {
        const distanceInKm = calculateDistance(originlatitude, originlongitude, destinylatitude, destinylongitude)

        const distanceInMetersInteger = Math.round(distanceInKm * 1000)

        setDistanceinmeters(distanceInMetersInteger);

    }, [originlatitude, originlongitude, destinylatitude, destinylongitude]);

    const handleSelectOrigin = (city: string, country: string, lat: number, lng: number) => {
        setOrigincity(city);
        setOrigincountry(country);
        setOriginlatitude(lat);
        setOriginlongitude(lng)
    };

    const handleSelectDestiny = (city: string, country: string, lat: number, lng: number) => {
        setDestinycity(city);
        setDestinycountry(country);
        setDestinylatitude(lat);
        setDestinylongitude(lng)
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleChangeModal: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setModal(event.target.value);
    };

    const handleImageChange = (image: string) => {
        // Atualiza o estado da imagem quando uma nova imagem é selecionada
        setTravelImage(image)
    };

    return (
        <div className="w-128 h-[600px] m-4 border border-custom-medium-blue  rounded-3xl">
            <div className="m-10 text-custom-dark-blue font-bold text-4xl">
                Editar Detalhes
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex justify-between ml-10 mr-16">
                    <div className="flex-grow mr-8">
                        <input type="hidden" name="id" value={travel.id} />
                        <input type="hidden" name="user_id" value={travel.user_id} />
                        <input type="hidden" name="date" value={travel.date} />

                        {/* Location */}
                        <div className="flex  gap-4 mt-8 justify-between">
                            <SearchAutocomplete onSelect={handleSelectOrigin} placeHolderText="Cidade de origem da viagem" />
                            <SearchAutocomplete onSelect={handleSelectDestiny} placeHolderText="Cidade de destino da viagem" />
                        </div>

                        {/* Modal */}
                        <div className="mt-8">
                            <select
                                id="modal"
                                name="modal"
                                className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue"
                                onChange={handleChangeModal}
                                defaultValue={travel.modal}
                                value={modal}
                            >
                                <option value="Avião">Avião</option>
                                <option value="Navio">Navio</option>
                                <option value="Trem">Trem</option>
                                <option value="Ônibus">Ônibus</option>
                                <option value="Carro">Carro</option>
                                <option value="Moto">Moto</option>
                                <option value="Bicicleta">Bicicleta</option>
                                <option value="Caminhando">Caminhando</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        {/* Descrição */}
                        <div className="mt-8">
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Descrição"
                                className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue pl-10 pr-10 pt-2 pb-40 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue"
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
                    <UploadImage onImageChange={handleImageChange} placeholderImage={travel.travelimage} />
                </div>
            </form>

        </div>


    );
}
