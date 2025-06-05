import React from "react";
import { useState, useEffect } from "react";

// Components
import MainCard from "../components/main-card.tsx"
import CompareTemp from "../components/compare-temp.tsx";
import MediumCardCarousel from "../components/medium-card-carousel.tsx";
import LocationSearch from '../components/location-search.tsx'

// Services
import { getDetailedWeather, getFavorites, getRecentSearches, saveRecentSearch, removeFavorite } from '../services/weatherService'
import { getLocationNameFromCoords } from '../utils/geocoderUtil'
import type { WeatherDetailedResponse } from '../types/weather'

// Styles
import "./body.css"


// Main body component, holding application content
const Body: React.FC = () => {
    // State variables
    const [selectedLocation, setSelectedLocation] = useState<{ name: string, latitude: number, longitude: number } | null>(null)
    const [detailedWeather, setDetailedWeather] = useState<WeatherDetailedResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [favorites, setFavorites] = useState<Array<{ name: string, latitude: number, longitude: number }>>([])
    const [recentSearches, setRecentSearches] = useState<Array<{ name: string, latitude: number, longitude: number }>>([])
    const [userLatitude, setUserLatitude] = useState<number | null>(null)
    const [userLongitude, setUserLongitude] = useState<number | null>(null)
    const [isUserSelection, setIsUserSelection] = useState(false)

    // Load favorites and recent searches from localStorage on component mount
    useEffect(() => {
        setFavorites(getFavorites())
        setRecentSearches(getRecentSearches())

        // Fallback location in case geolocation fails
        const setFallbackLocation = () => {
            console.log("Using fallback location: Berlin")
            setUserLatitude(52.52) 
            setUserLongitude(13.405)
            setSelectedLocation({ latitude: 52.52, longitude: 13.405, name: "Berlin (Fallback)" }) 
        }

        // Check if geolocation is available and get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setUserLatitude(latitude)
                    setUserLongitude(longitude)

                    // Try to get location name using reverse geocoding by coordinates
                    try {
                        const geoData = await getLocationNameFromCoords(latitude, longitude);
                        const city = geoData.city || geoData.state || geoData.displayName.split(',')[0];
                        const country = geoData.country || "";
                        setSelectedLocation({
                            latitude,
                            longitude,
                            name: country ? `${city}, ${country}` : city || "Current Location"
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
                    setFallbackLocation()
                }
            )
        } else {
            console.error("Geolocation is not supported by this browser.")
            setFallbackLocation()
        }
    }, []);

    // Fetch weather data for selected location to be displayed in the main card
    useEffect(() => {
        const fetchWeather = async () => {
            if (!selectedLocation) return;
            setLoading(true);
            setError(null);
            try {
                // Coordinates from the selected location are used to fetch weather data
                const data = await getDetailedWeather(selectedLocation.latitude, selectedLocation.longitude);
                setDetailedWeather(data);
                if (isUserSelection) {
                    // When the user selects a location it is stored in recent searches
                    saveRecentSearch(selectedLocation);
                    setRecentSearches(getRecentSearches());
                }
            } catch (err) {
                console.error("Error fetching weather data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [selectedLocation, isUserSelection]); const handleLocationSelect = async (location: { name: string, latitude: number, longitude: number }) => {
        // Event handler used by the LocationSearch component to set the selected location
        setIsUserSelection(true);
        setSelectedLocation(location);
    };

    if (!selectedLocation) {
        return <div>Loading location...</div>
    }

    // Takes a location object (name, latitude, longitude) and adds it to favorites or removes it from favorites
    const handleFavoriteAdded = () => {
        setFavorites(getFavorites());
    }; const handleRemoveFavorite = (location: { name: string, latitude: number, longitude: number }) => {
        removeFavorite(location);
        setFavorites(getFavorites());
    };

    // Updates the selected location when a card in the carousel is clicked, in order to update the main card
    const handleCardClick = (location: { name: string, latitude: number, longitude: number }) => {
        setIsUserSelection(true);
        setSelectedLocation(location);
    };

    // Render the main body with searchbar, main card, carousels for favorites and recent searches, and comparison graph
    return (
        <>
            <div className="main-body">
                <div className="search-container">
                    {/* Searchbar component */}
                    <LocationSearch
                        onLocationSelect={handleLocationSelect} />
                </div>

                {loading && <p>Loading weather data...</p>}
                {error && <p className="error">{error}</p>}

                {/* Main card component displaying detailed weather information */}
                {detailedWeather && !loading && (
                    <MainCard
                        weather={detailedWeather}
                        locationName={selectedLocation.name}
                        onFavoriteAdded={handleFavoriteAdded}
                    />
                )}
                {/* Carousel card displaying favorite locations */}
                <MediumCardCarousel
                    carouselType="favorites"
                    cardData={favorites}
                    onRemoveFavorite={handleRemoveFavorite}
                    onCardClick={handleCardClick}
                />
                {/* Carousel card displaying recent searches */}
                <MediumCardCarousel
                    carouselType="recent"
                    cardData={recentSearches}
                    onCardClick={handleCardClick}
                />
                {/* Card component holding chart.js graph, by default it takes the users current location */}
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