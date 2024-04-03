
import Image from 'next/image';


export default function ProfileMenu() {

    return (
        <a href='/profile'>
            <div className="relative">

                <Image
                    src="/assets/profile.png"
                    alt="profile picture"
                    width={38}
                    height={38}
                />
            </div>
        </a>
    )
}