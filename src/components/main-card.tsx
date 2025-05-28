/* Component for the main card, the location currently being displayed */
/* Holds main-card-head.tsx, main-card-details-list.tsx, hourly-list.tsx. weekly-list.tsx */

import React from "react";
import "./main-card.css";
import MainCardHead from "./main-card-head";
import MainCardDetails from "./main-card-details-list";
import MainCardCarousel from "./main-card-carousel";



const MainCard: React.FC = () => {
    return (
        <>
            <div className="main-card-container">
                <MainCardHead 
                locationName="Hässleholm"
                country="Sweden"
                temperature="20"
                feelsLike="18"
                weatherIcon="/src/assets/react.svg"
                weatherType="Slight overcast"
                maxTemp="25"
                minTemp="15"
                />
                <hr></hr>

                <MainCardDetails 
                sunrise="07:30"
                sunset="18:45"
                precipitation="12"
                wind="5"
                humidity="65"
                uvIndex="3"
                />
                <hr></hr>

                <MainCardCarousel 
                forecastType="hourly"
                />
                <hr></hr>
                
                <MainCardCarousel 
                forecastType="weekly"
                />
            </div>
        </>
    );
}

export default MainCard;