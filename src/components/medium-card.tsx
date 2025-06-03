/* Medium card used for favorite list and last viewed list */
/* Location name + City + Country, Temperature, Weather icon, Max temp, Min temp, Precipitation, Wind */


import React from "react";
import "./medium-card.css";
import { getWeatherIcon, getWeatherDescription, isDay } from "../utils/weatherUtils";


interface MediumCardProps {
    locationName: string;
    country: string;
    temperature: string;
    weatherIcon: string;
    weatherType: string;
    maxTemp: string;
    minTemp: string;
    precipitation: string;
    wind: string;
    windDirection?: string;
    currentTime?: string;
    sunrise?: string;
    sunset?: string;
    showRemoveButton?: boolean;
    onRemove?: () => void;
    onClick?: () => void;
}


const MediumCard: React.FC<MediumCardProps> = ({ locationName, country, temperature, weatherIcon, weatherType, maxTemp, minTemp, precipitation, wind, currentTime, sunrise, sunset, showRemoveButton, onRemove, onClick }) => {
    return (
        <>
            <div className="medium-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
                {showRemoveButton && (
                    <button 
                        className="remove-button" 
                        onClick={onRemove}
                        aria-label="Remove from favorites"
                    >
                        <p>×</p>
                    </button>
                )}
                <div className="medium-card-container">
                    <div className="medium-card-left-column">
                        <div className="medium-card-location">
                            <h4 className="medium-card-location-name">{locationName}</h4>
                            <p className="medium-card-location-city">{country}</p>
                        </div>
                        <div className="medium-card-temperature">
                            <h3 className="medium-card-temp">{temperature}°C</h3>
                            <div className="medium-card-maxmin">
                                <div className="medium-card-max">
                                    <img src="src/assets/thermometer-mercury.svg" alt="max-temp" className="max-min"></img>
                                    <p className="medium-card-max">{maxTemp}°C</p>
                                </div>
                                <div className="medium-card-min">
                                    <img src="src/assets/thermometer-mercury-cold.svg" alt="min-temp" className="max-min" ></img>
                                    <p className="medium-card-min">{minTemp}°C</p>
                                </div>
                            </div>
                        </div>
                        <div className="rain-and-wind">
                            <div className="medium-card-rain">
                                <img src="/src/assets/v4/umbrella.svg" alt="rain-icon" className="medium-card-rain-icon"></img>
                                <p className="medium-card-rain-text">{precipitation}mm</p>
                            </div>
                            <div className="medium-card-wind">
                                <img src="/src/assets/v4/windy.svg" alt="wind-icon" className="medium-card-wind-icon"></img>
                                <p className="medium-card-wind-text">{wind}</p>
                            </div>
                        </div>
                    </div>
                    <div className="medium-card-right-column">
                        <img src={getWeatherIcon(Number(weatherIcon), currentTime && sunrise && sunset ? isDay(currentTime, sunrise, sunset) : undefined)} alt={`${getWeatherDescription(parseInt(weatherType))} weather icon`} className="medium-card-weather-icon"></img>
                    </div>
                </div>
                
            </div>
        </>
    );
}
export default MediumCard;