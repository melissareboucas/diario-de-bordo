'use client'

import {
    ChevronDownIcon,
} from '@heroicons/react/24/outline';

import { useState } from 'react';

interface CardProps {
    title: string;
    img_url: string
    total: string
    text: string
}


export default function Card({ title, img_url, total, text }: CardProps) {

    const [mostrarTexto, setMostrarTexto] = useState(false);

    return (
        <div key={title} >
            <div
                className="relative"
                onMouseEnter={() => setMostrarTexto(true)}
                onMouseLeave={() => setMostrarTexto(false)}
            >
                <div className="relative">
                    <h2 className="absolute top-0 left-0 z-10 text-white p-6 text-5xl">{title}</h2>
                    <button className="absolute top-0 right-0 text-white h-10 w-10 mr-8 mt-4">
                        <ChevronDownIcon />
                    </button>
                    <img src={img_url} style={{ width: '400px', height: '450px' }} />
                    {mostrarTexto && (
                        <>
                        
                        <div className="absolute bottom-0 right-0 text-custom-extra-light-blue mb-10 mr-10 text-6xl font-light">
                            {total} {text}
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}