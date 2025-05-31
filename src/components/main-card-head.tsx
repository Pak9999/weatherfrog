/* Displays standard weather information about location currently active in main-card */
/* Location name + City + Country, Temperature, Feels like, Weather icon, Weather Type (ex Scattered showers), Max temp, Min temp */
/* Also gps-icon (quick route to activate current location in main-card) + star symbol (used to activate or deactivate as a favorite) */


import React from "react";
import "./main-card-head.css";
import { saveFavorite } from "../services/weatherService";
import { getWeatherIcon, getWeatherDescription } from "../utils/weatherUtils";

interface MainCardHeadProps {
    locationName: string;
    country: string;
    temperature: string;
    feelsLike: string;
    weatherIcon: string;
    weatherType: string;
    maxTemp: string;
    minTemp: string;
    longitude: number;
    latitude: number;
    onFavoriteAdded?: () => void;
}


const MainCardHead: React.FC<MainCardHeadProps> = ({ locationName, country, temperature, feelsLike, weatherType, maxTemp, minTemp, longitude, latitude, onFavoriteAdded}) => {
    const handleAddToFavorites = () => {
        const location = {
            name: locationName,
            longitude: longitude,
            latitude: latitude
        };
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
                        <img src={getWeatherIcon(parseInt(weatherType), true)} alt="current-weather-icon" className="current-weather-icon"></img>
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
                        <button onClick={handleAddToFavorites}> <img className="star-icon" src="src/assets/star-icon.svg" alt="star-icon" />Favorite</button>
                    </div>
                </section>
            </div>
        </>
    );
}

export default MainCardHead;