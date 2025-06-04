/* Displays standard weather information about location currently active in main-card */
/* Location name + City + Country, Temperature, Feels like, Weather icon, Weather Type (ex Scattered showers), Max temp, Min temp */
/* Also gps-icon (quick route to activate current location in main-card) + star symbol (used to activate or deactivate as a favorite) */


import React from "react";
import "./main-card-head.css";
import { saveFavorite, getFavorites } from "../services/weatherService";
import { getWeatherIcon, getWeatherDescription, isDay } from "../utils/weatherUtils";

interface MainCardHeadProps {
    locationName: string;
    country: string;
    fullName: string;
    temperature: string;
    feelsLike: string;
    weatherIcon: string;
    weatherType: string;
    maxTemp: string;
    minTemp: string;
    longitude: number;
    latitude: number;
    currentTime: string;
    sunrise: string;
    sunset: string;
    utcOffsetSeconds: number;
    onFavoriteAdded?: () => void;
}


const MainCardHead: React.FC<MainCardHeadProps> = ({ locationName, country, fullName, temperature, feelsLike, weatherType, maxTemp, minTemp, longitude, latitude, currentTime, sunrise, sunset, onFavoriteAdded}) => {
    const handleAddToFavorites = () => {
        const location = {
            name: fullName,
            longitude: longitude,
            latitude: latitude
        };

        const favorties = getFavorites();

        const isAlreadyFavorite = favorties.some(fav => fav.name === location.name)

        if (isAlreadyFavorite) {
            alert(`'${fullName}' is already saved as a favorite.`);
            return;
        }

        saveFavorite(location);

        if (onFavoriteAdded) {
            onFavoriteAdded();
        }
    }

    return (
        <>
            <div className="main-card-header-container">
                <section className="current-location">
                    <div className="location">
                        <h3>{locationName}</h3>
                        <p>{country}</p>
                    </div>
                    <div className="temp-and-icon">
                        <div className="temperature">
                            <h2 className="current-location-temperature">{temperature}°C</h2>
                            <p>Feels like: {feelsLike}°C</p>
                        </div>
                        <img src={getWeatherIcon(parseInt(weatherType), isDay(currentTime, sunrise, sunset))} alt={`${getWeatherDescription(parseInt(weatherType))} weather icon`} className="current-weather-icon"></img>
                    </div>
                    

                    <div className="type-and-maxmin">
                        <h3>{getWeatherDescription(parseInt(weatherType))}</h3>
                        <div className="current-max-min">
                            <p>max {maxTemp}°C</p>
                            <p>|</p>
                            <p>min {minTemp}°C</p>
                        </div>
                    
                    </div>
                    <div className="gps-and-favorite">
                        <button onClick={handleAddToFavorites} className="fav-button"> <img className="star-icon" src="src/assets/star-icon.svg" alt="star-icon" /> Add to favorites</button>
                    </div>
                </section>
            </div>
        </>
    );
}

export default MainCardHead;