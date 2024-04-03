'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export default function Search() {
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

    return (
        <section className="relative flex justify-between items-center px-4 py-1">
            <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-custom-dark-blue" />

            <input
                className="bg-custom-extra-light-blue border-custom-dark-blue block w-full rounded-md border py-[9px] pl-10 pr-3 text-sm outline-2 placeholder-custom-medium-blue focus:outline-custom-medium-blue"
                placeholder="Buscar diário de bordo"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </section>
    );
}
