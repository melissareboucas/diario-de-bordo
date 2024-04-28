
import TopMenu from "../ui/topMenu";
import UserInfo from "../ui/profile/userInfo";
import { Suspense } from "react";
import Card from "../ui/profile/card";
import { fetchUserById, fetchTotalKmByUser, fetchTotalCountriesByUser, fetchTotalCitiesByUser } from "../lib/data";


export default async function Profile() {
    const user = await fetchUserById('410544b2-4001-4271-9855-fec4b6a6442a')

    const totalKm = await fetchTotalKmByUser('410544b2-4001-4271-9855-fec4b6a6442a')
    const totalCountries = await fetchTotalCountriesByUser('410544b2-4001-4271-9855-fec4b6a6442a')
    const totalCities = await fetchTotalCitiesByUser('410544b2-4001-4271-9855-fec4b6a6442a')

    return <>
        <Suspense>  
            <TopMenu enableSearch={false}/>
        </Suspense>

        <UserInfo user={user} />
        
        <div className="mt-20 ml-20 mr-20 flex gap-4 justify-between">
            <Card title="Viagens" img_url="/assets/travels.png" total={totalKm} text="Km"/>
            <Card title="Países" img_url="/assets/countries.png" total={totalCountries} text={parseInt(totalCountries) > 1 ? `países` : `país`}/>
            <Card title="Cidades" img_url="/assets/cities.png" total={totalCities} text={parseInt(totalCities) > 1 ? `cidades` : `cidade`}/>
        </div>



    </>
}