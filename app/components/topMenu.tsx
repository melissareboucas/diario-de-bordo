'use client'

import Link from "next/link"

import {
    GlobeAmericasIcon,
    MapIcon,
    BuildingOffice2Icon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Image from 'next/image';

const links = [
    { name: 'Cities', href: '/profile/cities', icon: BuildingOffice2Icon },
    { name: 'Countries', href: '/profile/countries', icon: GlobeAmericasIcon },
    { name: 'Travels', href: '/profile/travels', icon: MapIcon },
];


export default function TopMenu() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }


    return <>
        <nav className="bg-custom-white text-custom-dark-blue py-1">
            <div className="container mx-auto flex justify-between items-center px-4 py-1">
                <section className="relative flex justify-between items-center px-4 py-1">
                    <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-custom-dark-blue" />

                    <input
                        className="bg-custom-extra-light-blue border-custom-dark-blue block w-full rounded-md border py-[9px] pl-10 pr-3 text-sm outline-2 placeholder-custom-medium-blue"
                        placeholder="Buscar diário de bordo"
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                        defaultValue={searchParams.get('query')?.toString()}
                    />
                </section>
                <ul className="flex space-x-10">
                    <Link key="travels" href="/profile/travels">
                        Viagens
                    </Link>
                    <Link key="countries" href="/profile/countries">
                        Países
                    </Link>
                    <Link key="cities" href="/profile/cities">
                        Cidades
                    </Link>
                    <Link key="community" href="/profile/community">
                        Comunidade
                    </Link>

                </ul>
                <Link
                    key="profile"
                    href="/profile"
                >
                    <Image
                        src="/assets/profile.png"
                        alt="profile picture"
                        width={38}
                        height={38}
                    />
                </Link>
            </div>
        </nav>
    </>
}