
import TopMenu from "../ui/topMenu";

import UserInfo from "../ui/profile/userInfo";

import { Suspense } from "react";
import Card from "../ui/profile/card";

import { fetchUserById } from "../lib/data";
import Cookies from 'js-cookie';


export default async function Profile() {
    const user = await fetchUserById('410544b2-4001-4271-9855-fec4b6a6442a')
   // const userCookie = Cookies.get('user');
    //const user = userCookie ? JSON.parse(userCookie) : null;

    
    //console.log(userCookie)

    return <>
        <Suspense>  
            <TopMenu />
        </Suspense>

        <UserInfo user={user} />
        
        <div className="mt-20 ml-20 mr-20 flex gap-4 justify-between">
            <Card title="Viagens" img_url="/assets/travels.png" />
            <Card title="Países" img_url="/assets/countries.png" />
            <Card title="Cidades" img_url="/assets/cities.png" />
        </div>



    </>
}