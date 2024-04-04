

import { TravelForm } from '@/app/lib/definitions';
import { updateTravel } from '@/app/lib/actions';

export default function EditTravelForm2({
    travel
}: {
    travel: TravelForm;
}) {

    const updateTravelWithId = updateTravel.bind(null, travel.id);
    return (
        <form action={updateTravelWithId}>
            <input type="hidden" name="id" value={travel.id} />
            <input type="hidden" name="user_id" value={travel.user_id} />
            <input type="hidden" name="travelimage" value={travel.travelimage} />
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Origin city */}
                <div className="mb-4">
                    <label htmlFor="origincity" className="mb-2 block text-sm font-medium">
                        Origin city
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="origincity"
                                name="origincity"
                                defaultValue={travel.origincity}
                                placeholder="origincity"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Origin country */}
                <div className="mb-4">
                    <label htmlFor="origincountry" className="mb-2 block text-sm font-medium">
                        Origin country
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="origincountry"
                                name="origincountry"
                                defaultValue={travel.origincountry}
                                placeholder="origincountry"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* destiny city */}
                <div className="mb-4">
                    <label htmlFor="destinycity" className="mb-2 block text-sm font-medium">
                        destiny city
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="destinycity"
                                name="destinycity"
                                defaultValue={travel.destinycity}
                                placeholder="destinycity"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* destiny country */}
                <div className="mb-4">
                    <label htmlFor="destinycountry" className="mb-2 block text-sm font-medium">
                        destiny country
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="destinycountry"
                                name="destinycountry"
                                defaultValue={travel.destinycountry}
                                placeholder="destinycountry"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* distance */}
                <div className="mb-4">
                    <label htmlFor="distanceinmeters" className="mb-2 block text-sm font-medium">
                        distance
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="distanceinmeters"
                                name="distanceinmeters"
                                defaultValue={travel.distanceinmeters}
                                placeholder="distanceinmeters"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* description */}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="description"
                                name="description"
                                defaultValue={travel.description}
                                placeholder="description"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4">
                <a
                    href="/profile/travels"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </a>
                <button type="submit">Edit Travel</button>
            </div>
        </form>
    );
}
