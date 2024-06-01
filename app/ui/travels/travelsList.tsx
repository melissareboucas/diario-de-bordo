
import { fetchFilteredTravels } from '@/app/lib/data';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { formatDateToLocal } from '@/app/lib/utils';
import { DropDownTravelMenu } from './dropDownTravelMenu';

export default async function TravelsList({
    query,
    currentPage,
    sub
}: {
    query: string;
    currentPage: number;
    sub: string
}) {
    const travels = await fetchFilteredTravels(query, currentPage, sub);

    const travelsMap = {
        "Avião": "travel",
        "Navio": "directions_boat",
        "Trem": "train",
        "Ônibus": "directions_bus",
        "Carro": "directions_car",
        "Moto": "motorcycle",
        "Bicicleta": "directions_bike",
        "Caminhando": "directions_walk",
        "Outro": "rocket_launch"
    }

    type TravelModal = keyof typeof travelsMap;

    return (
        <>
            {travels.length === 0 && (
                <div className="flex justify-center mt-10">
                    <a className="text-custom-dark-blue text-lg" href={`/profile/travels/create`}>Adicione a primeira viagem!</a>
                </div>
            )}
            {travels?.map((travel) => (
                <div key={travel.id} className='shadow-lg mr-64 ml-64 mt-16 max-h-[510px] relative border'>
                    <div className='flex flex-col justify-end items-end absolute top-0 right-0 text-custom-dark-blue m-4'>
                        <div>
                            {formatDateToLocal(travel.date)}
                        </div>
                        <DropDownTravelMenu id={travel.id} />

                    </div>
                    <div className='flex gap-2 m-8 items-center'>
                        <MapPinIcon className='size-6' />
                        <h1 className='font-semibold text-custom-dark-blue text-2xl'>{travel.origincity}, {travel.origincountry} -- <span className='material-symbols-outlined text-custom-dark-blue'>{travelsMap[travel.modal as TravelModal]}</span>
                             -- {travel.destinycity}, {travel.destinycountry}
                        </h1>
                        
                    </div>
                    <div className='ml-8 mr-8 mb-2 max-h-[100px] overflow-y-auto'>
                        <p className='text-custom-medium-blue'>{travel.description}</p>
                    </div>
                    <div className='w-full h-64'>
                        <img className='w-full h-full object-cover' src={travel.travelimage} />
                    </div>


                </div>))}

        </>
    );
}
