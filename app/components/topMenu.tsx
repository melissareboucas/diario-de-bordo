'use client'

import Link from "next/link"

import {
    GlobeAmericasIcon,
    MapIcon,
    BuildingOffice2Icon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

import { usePathname } from 'next/navigation';

import Image from 'next/image';

const links = [
    { name: 'Cities', href: '/profile/cities', icon: BuildingOffice2Icon },
    { name: 'Countries', href: '/profile/countries', icon: GlobeAmericasIcon },
    { name: 'Travels', href: '/profile/travels', icon: MapIcon },
];


export default function TopMenu() {
    function handleSearch(term: string) {
        console.log(term);
    }
    const pathname = usePathname();
    return <>
        <nav className="bg-custom-light-blue text-black py-1">
            <div className="container mx-auto flex justify-between items-center px-4 py-1">
                <section className="relative flex justify-between items-center px-4 py-1">
                    <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-custom-dark-blue" />

                    <input
                        className="block w-full rounded-md border py-[9px] pl-10 pr-3 text-sm outline-2 placeholder-custom-dark-blue"
                        placeholder="Buscar diário de bordo"
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                    />
                </section>
                <ul className="flex space-x-10">
                    {links.map((link) => {
                        const LinkIcon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="hover:text-custom-dark-blue">
                                <LinkIcon className="w-8" />

                            </Link>
                        );
                    })}
                    <Link
                        key="profile"
                        href="/profile"
                    >
                        <Image
                            src="/assets/profile.png"
                            alt="profile picture"
                            width={32}
                            height={32}
                        />
                    </Link>
                </ul>
            </div>
        </nav>
    </>
}