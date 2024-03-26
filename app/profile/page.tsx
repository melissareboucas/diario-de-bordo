'use client'

import TopMenu from "../components/topMenu";

import UserInfo from "../ui/profile/userInfo";
import { fetchUserById } from "../lib/data";
import { Suspense } from "react";
import Card from "../components/card";

export default async function Profile() {
    const user = await fetchUserById('410544b2-4001-4271-9855-fec4b6a6442a')

    function handleNewDiary() {
        console.log("novo diário")
    }
    return <>
        <Suspense>
            <TopMenu />
        </Suspense>
        <UserInfo user={user} />
        <div className="mt-20 ml-20 mr-20 flex gap-4 justify-between">
            <Card title="Viagens" img_url="/assets/travels.png"/>
            <Card title="Países" img_url="/assets/countries.png"/>
            <Card title="Cidades" img_url="/assets/cities.png"/>
        </div>
        


    </>
}   