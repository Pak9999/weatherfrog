/* Displays weather per hour of location currently active in main-card */
/* Data shown: Hour, weather icon, temperature in celsius */

import React from "react";
import "./hourly-card.css";


interface HourlyCardProps {
    hour: string;
    weatherIcon: string;
    temperature: string;
}

const HourlyCard: React.FC<HourlyCardProps> = ({ hour, weatherIcon, temperature}) => {
    return (
        <>
            <div className="hourly-card">
                <p>{hour}</p>
                <img src={weatherIcon} alt="weather-icon" className="hourly-weather-icon"></img>
                <p>{temperature}</p>
            </div>
        </>
    );
}

export default HourlyCard;