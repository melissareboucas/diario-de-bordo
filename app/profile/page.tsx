'use client'

import TopMenu from "../components/topMenu";

import {
    GlobeAmericasIcon,
    MapIcon,
    BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

export default function Profile() {
    function handleOpenMap() {
        console.log("abriu mapa")
    }
    function handleNewDiary() {
        console.log("novo diário")
    }
    return <>
        <TopMenu />
        <div className="container relative px-4 py-4 w-200 ">
            <img
                src="/assets/map.png"
                alt="world map"
                className="w-full object-cover rounded-md border-2 border-custom-medium-blue"
                style={{ height: "300px" }}
            />
            <button
                className="absolute bottom-0 right-0 text-custom-dark-blue bg-custom-extra-light-blue px-8 py-2 mr-8 
            mb-8 rounded-md border hover:text-custom-extra-light-blue hover:bg-custom-dark-blue"
                onClick={() => {
                    handleOpenMap();
                }}
            >
                Abrir Mapa
            </button>
        </div>
        {/*div não está responsiva: ajustar!! */}
        <div className="container text-custom-lg w-[1500px] h-full py-1 px-4 mt-0 ml-4 flex justify-between items-center rounded-md border-2 border-custom-medium-blue">
            <section >
                <img src="/assets/profile-lg.png" alt="Profile" className="absolute left-8 top-1/2 transform -translate-y-1/2" />
                <p className="mt-20 ml-5">
                    Melissa Viana
                </p>
            </section>
            <ul className="flex space-x-10">
                <div className="flex items-center justify-center">
                    <section className="flex flex-col items-center">
                        <div className="flex items-center">
                            <p>Viajado</p>
                            <MapIcon className="w-10" />
                        </div>
                        <p>1,2M Km</p>
                    </section>
                </div>
                <div className="flex items-center justify-center">
                    <section className="flex flex-col items-center">
                        <div className="flex items-center">
                            <p>Países</p>
                            <GlobeAmericasIcon className="w-10" />
                        </div>
                        <p>3</p>
                    </section>
                </div>
                <div className="flex items-center justify-center">
                    <section className="flex flex-col items-center">
                        <div className="flex items-center">
                            <p>Cidades</p>
                            <BuildingOffice2Icon className="w-10" />
                        </div>
                        <p>10</p>
                    </section>
                </div>
            </ul>
        </div>
        <div className="flex justify-center mt-[35px]">
            <button
                className="py-1 px-4 text-custom-dark-blue bg-custom-extra-light-blue rounded-md border hover:text-custom-extra-light-blue hover:bg-custom-dark-blue"
                onClick={() => {
                    handleNewDiary();
                }}
            >
                Adicionar diário de bordo
            </button>
        </div>

    </>
}   