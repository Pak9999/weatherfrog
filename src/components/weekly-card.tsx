/* Displays weather of upcomming weekdays + yesterday of location currently active in main-card */
/* Data shown: Day (mon, thu, today, thu), date, weather icon, max temp, min temp */


import React from "react";
import "./weekly-card.css";
import { getWeatherDescription } from "../utils/weatherUtils";


interface WeeklyCardProps {
    day: string;
    date: string;
    weatherIcon: string;
    weatherType: string;
    maxTemp: string;
    minTemp: string; 
};

const WeeklyCard: React.FC<WeeklyCardProps> = ({ day, date, weatherIcon, weatherType, maxTemp, minTemp }) => {
    return (
        <>
            <div className="weekly-card">
                <p>{day}</p>
                <p>{date}</p>
                <img src={weatherIcon} alt={`${getWeatherDescription(parseInt(weatherType))} weather icon`} className="weekly-weather-icon"></img>
                <p>{maxTemp}°C</p>
                <p>{minTemp}°C</p>
            </div>
        </>
    );
};

export default WeeklyCard;