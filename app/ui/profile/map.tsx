'use client'

import { useEffect, useState } from "react"
import React from "react"
import { Loader } from "@googlemaps/js-api-loader";

export default function Map() {

    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {

        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly'
            })

            const { Map } = await loader.importLibrary('maps')

            const position = {
                lat: 43.642693,
                lng: -79.3871189
            }

            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 5,
                mapId: 'user-map'
            }

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

            const origin = { lat: 43.642693, lng: -79.3871189 };

            const destinations = [
                { lat: 41.8781, lng: -87.6298 }, // Chicago
                { lat: 40.7128, lng: -74.0060 }, // Nova York
                { lat: -3.7172, lng: -38.5431 }   // Fortaleza, Brasil
            ];

            // Itera sobre cada destino
            destinations.forEach(destination => {
                // Cria uma linha pontilhada para cada destino
                const path = new google.maps.Polyline({
                    path: [origin, destination], // Define o caminho como uma lista contendo a origem e o destino
                    geodesic: true,
                    strokeOpacity: 0, // Defina a opacidade da linha como 0 para torná-la invisível
                    // Defina o padrão de traço
                    icons: [{
                        icon: {
                            path: 'M 0,-1 0,1',
                            strokeOpacity: 1,
                            scale: 4
                        },
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