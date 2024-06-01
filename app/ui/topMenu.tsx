import {
    GlobeAmericasIcon,
} from '@heroicons/react/24/outline';

import Link from "next/link";
import Search from "./search";
import { DropDownProfileMenu } from './dropDownProfileMenu';


interface TopMenuProps {
    enableSearch: boolean
}


export default function TopMenu({ enableSearch }: TopMenuProps) {

    return <>
        <nav className="bg-custom-white text-custom-dark-blue py-1">
            <div className="container mx-auto flex justify-between items-center px-4 py-1">
                {enableSearch && (
                    <Search />
                )}
                {!enableSearch && (
                    <Link key="profile" href="/profile">
                        <GlobeAmericasIcon className='w-10 h-10' />
                    </Link>

                )}


                <ul className="flex gap-4">
                    <Link className="font-semibold" key="travels" href="/profile/travels">
                        Viagens
                    </Link>
                    <Link className="font-semibold" key="community" href="/profile/community">
                        Comunidade
                    </Link>

                </ul>
                <DropDownProfileMenu />

            </div>
        </nav>
    </>
}