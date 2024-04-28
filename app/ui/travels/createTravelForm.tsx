"use client"

import SearchAutocomplete from "@/app/ui/autocomplete/searchAutocomplete"
import { createTravel } from '@/app/lib/actions';
import { useState, useEffect } from "react";
import { calculateDistance } from "@/app/lib/data";
import UploadImage from "../uploadImage";


export default function CreateTravelForm() {
    const [origincity, setOrigincity] = useState('')
    const [origincountry, setOrigincountry] = useState('')
    const [originlatitude, setOriginlatitude] = useState(0)
    const [originlongitude, setOriginlongitude] = useState(0)
    const [destinycity, setDestinycity] = useState('')
    const [destinycountry, setDestinycountry] = useState('')
    const [distanceinmeters, setDistanceinmeters] = useState(0)
    const [destinylatitude, setDestinylatitude] = useState(0)
    const [destinylongitude, setDestinylongitude] = useState(0)
    const [description, setDescription] = useState('')
    const [modal, setModal] = useState('')
    const [travelimage, setTravelImage] = useState('')
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createTravel(origincity, origincountry, originlatitude, originlongitude,
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
                Como foi sua viagem?
            </div>

            <form onSubmit={handleSubmit} >
                <div className="flex justify-between ml-10 mr-16">
                    <div className="flex-grow mr-8">
                        {/*User Id, informação escondida que tem que ser enviada*/}
                        <input
                            id="user_id"
                            name="user_id"

                            placeholder="user_id"
                            type="hidden"
                            readOnly
                            value={"410544b2-4001-4271-9855-fec4b6a6442a"}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />

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
                                onChange={(e) => setModal(e.target.value)}
                                value={modal}
                            >
                                <option value="" disabled hidden>Selecione uma modalidade</option>
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
                    <UploadImage onImageChange={handleImageChange} placeholderImage="/assets/addImage.png" />
                </div>
            </form>
            {/*<img src="/assets/addImage.png" style={{ width: '400px', height: '450px' }} ></img>*/}
        </div>


    );
}