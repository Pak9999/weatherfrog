/* Displays weather per hour of location currently active in main-card */
/* Data shown: Hour, weather icon, temperature in celsius */

import React from "react";
import "./hourly-card.css";
import { getWeatherDescription } from "../utils/weatherUtils";


interface HourlyCardProps {
    hour: string;
    weatherIcon: string;
    weatherType: string;
    temperature: string;
}

// HourlyCard component
const HourlyCard: React.FC<HourlyCardProps> = ({ hour, weatherIcon, weatherType, temperature}) => {
    return (
        <>
            <div className="hourly-card">
                <p>{hour}</p>
                <img src={weatherIcon} alt={`${getWeatherDescription(parseInt(weatherType))} weather icon`} className="hourly-weather-icon"></img>
                <p>{temperature}°C</p>
            </div>
        </>
    );
}

export default HourlyCard;