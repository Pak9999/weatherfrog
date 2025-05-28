/* Displays weather of upcomming weekdays + yesterday of location currently active in main-card */
/* Data shown: Day (mon, thu, today, thu), date, weather icon, max temp, min temp */


import React from "react";
import "./weekly-card.css";

const WeeklyCard: React.FC = () => {
    return (
        <>
            <div className="weekly-card">
                <p>Mon</p>
                <p>12/12</p>
                <img src="/src/assets/react.svg" alt="weather-icon" className="weekly-weather-icon"></img>
                <p>15°C</p>
                <p>10°C</p>
            </div>
        </>
    );
}

export default WeeklyCard;