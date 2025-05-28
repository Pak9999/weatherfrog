/* Displays standard weather information about location currently active in main-card */
/* Location name + City + Country, Temperature, Feels like, Weather icon, Weather Type (ex Scattered showers), Max temp, Min temp */
/* Also gps-icon (quick route to activate current location in main-card) + star symbol (used to activate or deactivate as a favorite) */


import React from "react";
import "./main-card-head.css";

const MainCardHead: React.FC = () => {
    return (
        <>
            <div className="main-card-header-container">
                <section className="current-location">
                    <div className="location">
                        <h3>Your location</h3>
                        <p>City, Country</p>
                    </div>
                    <div className="temp-and-icon">
                        <div className="temperature">
                            <h2 className="current-location-temperature">-12°C</h2>
                            <p>Feels like: -12°C</p>
                        </div>
                        <img src="/src/assets/react.svg" alt="current-weather-icon" className="current-weather-icon"></img>
                    </div>
                    

                    <div className="type-and-maxmin">
                        <h3>Scattered showers</h3>
                        <div className="current-max-min">
                            <p>max 14°C</p>
                            <p>min 11°C</p>
                        </div>
                    
                    </div>
                </section>
            </div>
        </>
    );
}

export default MainCardHead;