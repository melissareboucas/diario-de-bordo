
import { fetchFilteredTravels } from '@/app/lib/data';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function TravelsList({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const travels = await fetchFilteredTravels(query, currentPage);

    return (
        <>
            {travels?.map((travel) => (
                <div key={travel.id} className='shadow-lg mr-64 ml-64 mt-16 h-[510px] relative border'>
                    <div className='absolute top-0 right-0 text-custom-dark-blue m-4'>
                        {formatDateToLocal(travel.date)}
                    </div>
                    <div className='flex gap-2 m-8 items-center'>
                        <MapPinIcon className='size-6' />
                        <h1 className='font-semibold text-custom-dark-blue text-2xl'>{travel.destinycity}, {travel.destinycountry}</h1>
                    </div>
                    <div className='ml-16'>
                        <p className='text-custom-medium-blue'>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae porttitor turpis, et.</p>
                    </div>
                    <div className='w-full'>
                        <img className='mt-4 w-full h-auto max-w-full max-h-[350px]' src="/assets/sp.png"/>
                    </div>
                    
                    
                </div>))}
        </>
    );
}
