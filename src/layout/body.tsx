import React from "react";
import { useState, useEffect } from "react";

import "./body.css"
import MainCard from "../components/main-card.tsx"
import CompareTemp from "../components/compare-temp.tsx";
import MediumCardCarousel from "../components/medium-card-carousel.tsx";


import LocationSearch from '../components/location-search.tsx'

import { getDetailedWeather, getFavorites, getRecentSearches, saveRecentSearch } from '../services/weatherService'
import { getLocationNameFromCoords } from '../utils/geocoderUtil'
import type { WeatherDetailedResponse } from '../types/weather'



const Body: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<{ name: string, latitude: number, longitude: number } | null>(null)
    const [detailedWeather, setDetailedWeather] = useState<WeatherDetailedResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [favorites, setFavorites] = useState<Array<{ name: string, latitude: number, longitude: number }>>([])
    const [recentSearches, setRecentSearches] = useState<Array<{ name: string, latitude: number, longitude: number }>>([])
    const [userLatitude, setUserLatitude] = useState<number | null>(null)
    const [userLongitude, setUserLongitude] = useState<number | null>(null)

    // Load favorites and recent searches from localStorage on component mount
    useEffect(() => {
        setFavorites(getFavorites())
        setRecentSearches(getRecentSearches())

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setUserLatitude(latitude)
                    setUserLongitude(longitude)

                    // Try to get location name using reverse geocoding
                    try {
                        const geoData = await getLocationNameFromCoords(latitude, longitude);
                        const locationName = geoData.city || geoData.state || geoData.displayName.split(',')[0];
                        setSelectedLocation({
                            latitude,
                            longitude,
                            name: locationName || "Current Location"
                        });
                    } catch (geoError) {
                        console.error("Error getting location name:", geoError);
                        setSelectedLocation({
                            latitude,
                            longitude,
                            name: "Current Location"
                        });
                    }
                },
                (error) => {
                    console.error("Error getting user location:", error)
                    // Fallback to a default location if geolocation fails or is denied
                    setUserLatitude(52.52) // Berlin as a fallback
                    setUserLongitude(13.405)
                    setSelectedLocation({ latitude: 52.52, longitude: 13.405, name: "Berlin (Fallback)" })
                }
            )
        } else {
            console.error("Geolocation is not supported by this browser.")
            // Fallback to a default location if geolocation is not supported
            setUserLatitude(52.52)
            setUserLongitude(13.405)
            setSelectedLocation({ latitude: 52.52, longitude: 13.405, name: "Berlin (Fallback)" })
        }
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!selectedLocation) return;
            setLoading(true);
            setError(null);
            try {
                const data = await getDetailedWeather(selectedLocation.latitude, selectedLocation.longitude);
                setDetailedWeather(data);
                // Save to recent searches
                saveRecentSearch(selectedLocation);
                setRecentSearches(getRecentSearches());
            } catch(err) {
                console.error("Error fetching weather data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [selectedLocation]);

    const handleLocationSelect = async (location: { name: string, latitude: number, longitude: number }) => {
        setSelectedLocation(location);
    };

    if (!selectedLocation) {
        return <div>Loading location...</div> 
    }

    const handleFavoriteAdded = () => {
    setFavorites(getFavorites()); 
    };

    return (
        <>
            <div className="main-body">
                <div className="search-container">
                    <LocationSearch onLocationSelect={handleLocationSelect} />
                </div>

                {loading && <p>Loading weather data...</p>}
                {error && <p className="error">{error}</p>}

                {detailedWeather && !loading &&  (
                    <MainCard 
                        weather={detailedWeather}
                        locationName={selectedLocation.name}
                        onFavoriteAdded={handleFavoriteAdded}
                />
                )}
                <MediumCardCarousel
                    carouselType="favorites"
                    cardData={favorites}
                />
                <MediumCardCarousel
                    carouselType="recent"
                    cardData={recentSearches}
                />
                <CompareTemp 
                    userLatitude={userLatitude || 0}
                    userLongitude={userLongitude || 0}
                    selectedLocation={selectedLocation}
                />
            </div>
        </>
    );
}

export default Body;