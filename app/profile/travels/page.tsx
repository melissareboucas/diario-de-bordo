import TopMenu from "@/app/ui/topMenu"
import { fetchTravelsPages } from '@/app/lib/data';
import TravelsList from "@/app/ui/travels/travelsList";
import Pagination from "@/app/ui/travels/pagination";
import { Suspense } from "react";
import BackLink from "@/app/ui/backlink";
import TopPage from "@/app/ui/topPage";
import { AddButton } from "@/app/ui/travels/addButton";
import { cookies } from 'next/headers';
import { openSessionToken } from "@/app/lib/auth-service";

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

    const cookieStore = cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
        // Handle missing token, e.g., redirect to login
        return <div>Redirecionando...</div>;
    }

    try {
        const payload = await openSessionToken(token);
        const sub = payload.sub;

        if (!sub) {
            // Handle missing token, e.g., redirect to login
            return <div>Redirecionando...</div>;
        }

        const totalPages = await fetchTravelsPages(query, sub);

        return (
            <>
                <Suspense>
                    <TopMenu enableSearch={true} />
                </Suspense>
                <BackLink backToLink="/profile" backToText="Voltar para Home" />
                <TopPage title="Minhas viagens" img_url="/assets/travels-sm.png" />
                <div className="mt-2 flex justify-end">
                    <AddButton sendToLink='/profile/travels/create' buttonText='Adicionar viagem' />
                </div>
                <TravelsList query={query} currentPage={currentPage} sub={sub} />
                <Pagination totalPages={totalPages} />
            </>
        )
    } catch (err) {
        // Handle invalid token, e.g., redirect to login
        return <div>Redirecionando...</div>;
    }



}