'use client'

import TopMenu from "../components/topMenu";

import UserInfo from "../ui/profile/userInfo";
import { fetchUserById } from "../lib/data";

export default async function Profile() {
    const user = await fetchUserById('410544b2-4001-4271-9855-fec4b6a6442a')
    
    function handleNewDiary() {
        console.log("novo diário")
    }
    return <>
        <TopMenu />
        <UserInfo user={user}/>
        
        

    </>
}   