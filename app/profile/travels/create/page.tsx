"use client"

import TopMenu from "@/app/components/topMenu";
import { createTravel } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default async function Create() {
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createTravel, initialState);
    return (
        <main>
            <TopMenu />
            <form action={dispatch}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* user_id */}
                    <div className="mb-4">
                        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                            user_id
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="user_id"
                                    name="user_id"
                                    type="string"
                                    placeholder="origincity"
                                    readOnly
                                    value={"410544b2-4001-4271-9855-fec4b6a6442a"}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Origin city */}
                    <div className="mb-4">
                        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                            Origin city
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="origincity"
                                    name="origincity"
                                    type="string"
                                    placeholder="origincity"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Origin country */}
                    <div className="mb-4">
                        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                            Origin country
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="origincountry"
                                    name="origincountry"
                                    type="string"
                                    placeholder="origincountry"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* destiny city */}
                    <div className="mb-4">
                        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                            Destiny city
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="destinycity"
                                    name="destinycity"
                                    type="string"
                                    placeholder="destinycity"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* destiny country */}
                    <div className="mb-4">
                        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                            Destiny country
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="destinycountry"
                                    name="destinycountry"
                                    type="string"
                                    placeholder="destinycountry"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* distance */}
                    <div className="mb-4">
                        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                            Distance
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="distanceinmeters"
                                    name="distanceinmeters"
                                    type="string"
                                    placeholder="distanceinmeters"
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
                    <button type="submit">Create Travel</button>
                </div>
            </form>
        </main>
    );
}