import React from "react";
import { useState, useEffect } from "react";

import "./body.css"
import MainCard from "../components/main-card.tsx"
import CompareTemp from "../components/compare-temp.tsx";
import MediumCardCarousel from "../components/medium-card-carousel.tsx";


import LocationSearch from '../components/LocationSearch'
import WeatherDetailedView from '../components/WeatherDetailedView'
import WeatherSimpleView from '../components/WeatherSimpleView'
import HistoricalWeatherChart from '../components/HistoricalWeatherChart'
import { getDetailedWeather, getSimpleWeather, getFavorites, getRecentSearches, saveFavorite, saveRecentSearch } from '../services/weatherService'
import { getLocationNameFromCoords } from '../utils/geocoderUtil'
import type { WeatherDetailedResponse, WeatherSimpleResponse } from '../types/weather'



const Body: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<{ name: string, latitude: number, longitude: number } | null>(null)
    const [detailedWeather, setDetailedWeather] = useState<WeatherDetailedResponse | null>(null)
    const [simpleWeather, setSimpleWeather] = useState<WeatherSimpleResponse | null>(null)
    const [viewType, setViewType] = useState<'simple' | 'detailed'>('simple')
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
            } catch (err) {
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [selectedLocation]);

    const handleLocationSelect = async (location: { name: string, latitude: number, longitude: number }) => {
        setSelectedLocation(location);
    };


    const handleAddToFavorites = () => {
        if (selectedLocation) {
            saveFavorite(selectedLocation)
            setFavorites(getFavorites())
        }
    }

    if (!selectedLocation) {
        return <div>Loading location...</div> // Or some other loading state
    }

    return (
        <>
            <div className="main-body">

                {loading && <p>Loading weather data...</p>}
                {error && <p className="error">{error}</p>}

                {detailedWeather && !loading &&  (
                    <MainCard 
                        weather={detailedWeather}
                        locationName={selectedLocation.name}
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
            <div className="app-container">
                <h1>Weather Frog</h1>

                <div className="search-container">
                    <LocationSearch onLocationSelect={handleLocationSelect} />
                </div>

                

{/*                 {detailedWeather && selectedLocation && !loading && (
                    <WeatherDetailedView
                        weather={detailedWeather}
                        locationName={selectedLocation.name}
                    />
                )}

                {simpleWeather && selectedLocation && !loading && (
                    <WeatherSimpleView
                        weather={simpleWeather}
                        locationName={selectedLocation.name}
                    />
                )}
 */}
                <div className="saved-locations">
                    {favorites.length > 0 && (
                        <div className="favorites">
                            <h3>Favorites</h3>
                            <ul>
                                {favorites.map((location, index) => (
                                    <li key={`fav-${index}`}>
                                        <button onClick={() => handleLocationSelect(location)}>
                                            {location.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {recentSearches.length > 0 && (
                        <div className="recent-searches">
                            <h3>Recent Searches</h3>
                            <ul>
                                {recentSearches.map((location, index) => (
                                    <li key={`recent-${index}`}>
                                        <button onClick={() => handleLocationSelect(location)}>
                                            {location.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="historical-weather-chart-section">
                    {userLatitude && userLongitude && (
                        <HistoricalWeatherChart
                            initialLatitude={userLatitude}
                            initialLongitude={userLongitude}
                            initialLocationName={selectedLocation.name} // Pass the name of the initially selected location
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Body;