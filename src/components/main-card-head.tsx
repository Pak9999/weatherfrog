/* Displays standard weather information about location currently active in main-card */
/* Location name + City + Country, Temperature, Feels like, Weather icon, Weather Type (ex Scattered showers), Max temp, Min temp */
/* Also gps-icon (quick route to activate current location in main-card) + star symbol (used to activate or deactivate as a favorite) */


import React from "react";


const MainCardHead: React.FC = () => {
    return (
        <>
            <div className="main-card-header-container">
                <section className="current-location">
                    <h3>Your location</h3>
                    <p>City, Country</p>
                </section>
                <section className="current-location-weather">
                    <h2 className="current-location-temperature">-12°C</h2>
                    <p>Feels like: -12°C</p>
                    <h3>Scattered showers</h3>
                    <div className="current-max-min">
                        <p>max 14°C</p>
                        <p>min 11°C</p>
                    </div>
                </section>
            </div>
        </>
    );
}

export default MainCardHead;