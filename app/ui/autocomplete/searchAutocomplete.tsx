'use client'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect, useState } from "react";

interface AddressComponents {
    long_name: string;
    types: string[];
}

interface GeocodingResult {
    results: {
        address_components: AddressComponents[];
    }[];
}

interface CityAndCountry {
    city: string;
    country: string;
}

interface SearchAutocompleteProps {
    onSelect: (city: string, country: string) => void;
    placeHolderText: string
}

function getCityAndCountry(latitude: number, longitude: number): Promise<CityAndCountry | null> {
    return new Promise((resolve, reject) => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.results.length > 0) {
                    const addressComponents = data.results[0].address_components;
                    let city = "";
                    let country = "";

                    for (const component of addressComponents) {
                        if (component.types.includes("locality")) {
                            city = component.long_name;
                            break;
                        }
                        else if (component.types.includes("administrative_area_level_2")) {
                            city = component.long_name;
                        }
                    }
        
                    for (const component of addressComponents) {
                        if (component.types.includes("country")) {
                            country = component.long_name;
                        }
                    }

                    resolve({ city, country });
                } else {
                    reject(new Error("No results found"));
                }
            })
            .catch(error => {
                console.error("Error getting city and country:", error);
                reject(error);
            });
    });
}


export default function SearchAutocomplete({ onSelect, placeHolderText }: SearchAutocompleteProps) {
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

    
    useEffect(() => {
        onSelect(city, country)
    }, [city, country])

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e: { target: { value: string; }; }) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }: { description: string }) =>
            () => {
                // When the user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();

                // Get latitude and longitude via utility functions
                getGeocode({ address: description })
                    .then(results => getLatLng(results[0]))
                    .then(({ lat, lng }) => getCityAndCountry(lat, lng))
                    .then(cityAndCountry => {
                        if (cityAndCountry) {
                            const { city, country } = cityAndCountry;                          
                            setCity(city);
                            setCountry(country);
                        } else {
                            console.log("City and country not found.");
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li 
                    className="ml-4 text-custom-dark-blue"
                    key={place_id} 
                    onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <div ref={ref}>
            <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder={placeHolderText}
                className="peer block w-full rounded-3xl border border-custom-medium-blue text-custom-medium-blue py-2 pl-10 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue "

            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <ul>{renderSuggestions()}</ul>}
        </div>
    );
};