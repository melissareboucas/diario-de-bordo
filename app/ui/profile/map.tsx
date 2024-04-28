'use client'

import { useEffect, useState } from "react"
import React from "react"
import { Loader } from "@googlemaps/js-api-loader";
import { 
    Paths, 
    MostPopularOrigin, 
    FlightIcon, 
    ShipIcon, 
    TrainIcon, 
    BusIcon, 
    CarIcon, 
    MotorcycleIcon,
    BikeIcon,
    WalkingIcon,
    OtherIcon } from '../../lib/definitions'

interface MapProps {
    origin: MostPopularOrigin;
    paths: Paths[];
}

const modalIconMap = {
    "Avião": FlightIcon,
    "Navio": ShipIcon,
    "Trem": TrainIcon,
    "Ônibus": BusIcon,
    "Carro": CarIcon,
    "Moto": MotorcycleIcon,
    "Bicicleta": BikeIcon,
    "Caminhando": WalkingIcon,
    "Outro": OtherIcon
}

type TravelModal = keyof typeof modalIconMap;


export default function Map({ origin, paths }: MapProps) {

    const mapRef = React.useRef<HTMLDivElement>(null);


    useEffect(() => {

        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly'
            })

            const { Map } = await loader.importLibrary('maps')

            const position = {
                lat: parseFloat((origin.originlatitude)),
                lng: parseFloat((origin.originlongitude))
            }

            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 10,
                mapId: 'user-map',
                minZoom: 2
            }

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions)


            // Itera sobre cada destino
            paths.forEach(pathElement => {
                // Cria uma linha pontilhada para cada destino
                const path = new google.maps.Polyline({
                    path: [{ lat: parseFloat(pathElement.originlatitude), lng: parseFloat(pathElement.originlongitude) },
                    { lat: parseFloat((pathElement.destinylatitude)), lng: parseFloat((pathElement.destinylongitude)) }], // Define o caminho como uma lista contendo a origem e o destino
                    geodesic: true,
                    strokeOpacity: 0, 
                    icons: [{
                        icon: modalIconMap[pathElement.modal as  keyof typeof modalIconMap],
                        offset: '0',
                        repeat: '20px'  // Ajuste o espaçamento para controlar a frequência das marcações
                    }]
                });

                // Adiciona a linha ao mapa
                path.setMap(map);
            });


        }

        initMap();

    }, [])


    return (
        <>
            <h1>Google Maps</h1>
            <div className="h-[300px]" ref={mapRef} />
        </>
    )
}