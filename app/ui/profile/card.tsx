import {
    ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface CardProps {
    title: string;
    img_url: string
}

const links = [
    { title: 'Viagens', href: '/profile/travels' },
    { title: 'Países', href: '/profile/countries' },
    { title: 'Cidades', href: '/profile/cities' },
  ];

export default function Card({ title, img_url }: CardProps) {

    const link = links.find(link => link.title === title); 

    return (
        <Link key={title} href={(link?link.href:'/profile')}>
            <div className="relative">
                <div className='flex justify-between'>
                    <h2 className="absolute top-0 left-0 z-10 text-white p-6 text-5xl">{title}</h2>
                    <button
                        className='absolute top-0 right-0 text-white h-10 w-10 mr-8 mt-4'
                        
                    >
                        <ChevronDownIcon />
                    </button>

                </div>
                <img src={img_url} style={{ width: '400px', height: '450px' }} />
            </div>
        </Link>
    );
}