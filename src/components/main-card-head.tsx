/* Displays standard weather information about location currently active in main-card */
/* Location name + City + Country, Temperature, Feels like, Weather icon, Weather Type (ex Scattered showers), Max temp, Min temp */
/* Also gps-icon (quick route to activate current location in main-card) + star symbol (used to activate or deactivate as a favorite) */


import React from "react";
import "./main-card-head.css";
import { saveFavorite } from "../services/weatherService";

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


const MainCardHead: React.FC<MainCardHeadProps> = ({ locationName, country, temperature, feelsLike, weatherIcon, weatherType, maxTemp, minTemp, longitude, latitude, onFavoriteAdded}) => {
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
                        <img src={weatherIcon} alt="current-weather-icon" className="current-weather-icon"></img>
                    </div>
                    

                    <div className="type-and-maxmin">
                        <h3>{weatherType}</h3>
                        <div className="current-max-min">
                            <p>max {maxTemp}°C</p>
                            <p>min {minTemp}°C</p>
                        </div>
                    
                    </div>
                    <div className="gps-and-favorite">
{/*                         <button onClick={window.location.reload}>GPS<img src="/src/assets/react.svg" alt="gps icon" className="gps-icon"></img></button>
 */}                        <button onClick={handleAddToFavorites}>FAV<img src="/src/assets/react.svg" alt="star icon" className="star-icon"></img></button>
                    </div>
                </section>
            </div>
        </>
    );
}

export default MainCardHead;