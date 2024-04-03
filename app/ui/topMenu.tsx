

import Link from "next/link";
import Search from "./search";
import ProfileMenu from "./profileMenu";
import Logout from "./logout";



export default function TopMenu() {

    return <>
        <nav className="bg-custom-white text-custom-dark-blue py-1">
            <div className="container mx-auto flex justify-between items-center px-4 py-1">
                <Search />
                <ul className="flex space-x-10">
                    <Link className="font-semibold" key="travels" href="/profile/travels">
                        Viagens
                    </Link>
                    <Link className="font-semibold" key="countries" href="/profile/countries">
                        Países
                    </Link>
                    <Link className="font-semibold" key="cities" href="/profile/cities">
                        Cidades
                    </Link>
                    <Link className="font-semibold" key="community" href="/profile/community">
                        Comunidade
                    </Link>

                </ul>
                <ProfileMenu />
            </div>
        </nav>
    </>
}