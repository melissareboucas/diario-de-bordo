import TopMenu from "@/app/ui/topMenu"
import { fetchTravelsPages } from '@/app/lib/data';
import TravelsList from "@/app/ui/travels/travelsList";
import Pagination from "@/app/ui/travels/pagination";
import { Suspense } from "react";
import BackLink from "@/app/ui/backlink";
import TopPage from "@/app/ui/topPage";

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
            <BackLink />
            <TopPage title="Minhas viagens" img_url="/assets/travels-sm.png"/>
            <TravelsList query={query} currentPage={currentPage} />
            <Pagination totalPages={totalPages} />
        </>
    )


}