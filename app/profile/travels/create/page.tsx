import TopMenu from "@/app/ui/topMenu";
import { Suspense } from "react";
import CreateTravelForm from "@/app/ui/travels/createTravelForm";

import { cookies } from 'next/headers';
import { openSessionToken } from "@/app/lib/auth-service";



export default async function Create() {

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

        return (
            <main>
                <Suspense>
                    <TopMenu enableSearch={false}/>
                </Suspense>
                <CreateTravelForm sub={sub} />
            </main>
        );
    } catch (err) {
        // Handle invalid token, e.g., redirect to login
        return <div>Redirecionando...</div>;
    }
    
}