
import Image from 'next/image';
import { DropDownProfileMenu } from './dropDownProfileMenu';


export default function ProfileMenu() {

    return (
            <div className="relative flex gap-1 justify-center items-center">

                <Image
                    src="/assets/profile.png"
                    alt="profile picture"
                    width={38}
                    height={38}
                />
                <DropDownProfileMenu />
            </div>
    )
}