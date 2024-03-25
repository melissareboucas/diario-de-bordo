import TopMenu from "@/app/components/topMenu"
import { fetchTravelsPages } from '@/app/lib/data';
import TravelsTable from "@/app/ui/travels/table";
import Pagination from "@/app/ui/travels/pagination";
import { Suspense } from "react";

export default async function Travels({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchTravelsPages(query);

    return (
        <>
            <Suspense>
                <TopMenu />
            </Suspense>
            Travels
            <TravelsTable query={query} currentPage={currentPage} />
            <Pagination totalPages={totalPages} />
        </>
    )


}