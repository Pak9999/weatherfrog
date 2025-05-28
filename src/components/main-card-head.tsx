/* Displays standard weather information about location currently active in main-card */
/* Location name + City + Country, Temperature, Feels like, Weather icon, Weather Type (ex Scattered showers), Max temp, Min temp */
/* Also gps-icon (quick route to activate current location in main-card) + star symbol (used to activate or deactivate as a favorite) */


import React from "react";
import "./main-card-head.css";

interface MainCardHeadProps {
    locationName: string;
    country: string;
    temperature: string;
    feelsLike: string;
    weatherIcon: string;
    weatherType: string;
    maxTemp: string;
    minTemp: string;
}



const MainCardHead: React.FC<MainCardHeadProps> = ({ locationName, country, temperature, feelsLike, weatherIcon, weatherType, maxTemp, minTemp }) => {
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
                </section>
            </div>
        </>
    );
}

export default MainCardHead;