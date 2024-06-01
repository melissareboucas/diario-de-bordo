
import TopMenu from "../ui/topMenu";
import UserInfo from "../ui/profile/userInfo";
import { Suspense } from "react";
import Card from "../ui/profile/card";
import { fetchUserById, fetchTotalKmByUser, fetchTotalCountriesByUser, fetchTotalCitiesByUser } from "../lib/data";

import { cookies } from 'next/headers';
import { openSessionToken } from '../lib/auth-service';




export default async function Profile() {

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

        const user = await fetchUserById(sub)
        const totalKm = await fetchTotalKmByUser(sub)
        const totalCountries = await fetchTotalCountriesByUser(sub)
        const totalCities = await fetchTotalCitiesByUser(sub)

        return (<>
            <Suspense>
                <TopMenu enableSearch={false} />
            </Suspense>

            <UserInfo user={user} />

            <div className="mt-20 ml-20 mr-20 flex gap-4 justify-between">
                <Card title="Viagens" img_url="/assets/travels.png" total={totalKm} text="Km" />
                <Card title="Países" img_url="/assets/countries.png" total={totalCountries} text={parseInt(totalCountries) > 1 ? `países` : `país`} />
                <Card title="Cidades" img_url="/assets/cities.png" total={totalCities} text={parseInt(totalCities) > 1 ? `cidades` : `cidade`} />
            </div>



        </>)
    } catch (err) {
        // Handle invalid token, e.g., redirect to login
        return <div>Redirecionando...</div>;
    }





}