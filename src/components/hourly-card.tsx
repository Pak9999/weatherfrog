/* Displays weather per hour of location currently active in main-card */
/* Data shown: Hour, weather icon, temperature in celsius */

import React from "react";
import "./hourly-card.css";


const HourlyCard: React.FC = () => {
    return (
        <>
            <div className="hourly-card">
                <p>12:00</p>
                <img src="/src/assets/react.svg" alt="weather-icon" className="hourly-weather-icon"></img>
                <p>15°C</p>
            </div>
        </>
    );
}

export default HourlyCard;