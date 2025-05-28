/* Carousel component that holds cards (hourly or weekly) related to location currently active in main-card */


import React from "react";
import HourlyCard from "./hourly-card";
import WeeklyCard from "./weekly-card";

import "./main-card-carousel.css";


interface MainCardCarouselProps {
    forecastType: "hourly" | "weekly";
}


const MainCardCarousel: React.FC<MainCardCarouselProps> = ({ forecastType }) => {
    return (
        <>
            <div className="main-card-carousel-container">
                <h3>{forecastType === "hourly" ? "Hourly" : "Weekly"}</h3>
                <div className="carousel-test">
                    {forecastType === "hourly" ? (
                        <>
                            <HourlyCard /* Update props */
                            hour="14:00"
                            weatherIcon="/src/assets/react.svg"
                            temperature="20°C"
                            />
                            
                        </>
                    ) : (
                        <>
                            <WeeklyCard /* Update props */
                            day="Mon"
                            date="15/02"
                            weatherIcon="/src/assets/react.svg"
                            maxTemp="25°C"
                            minTemp="15°C"
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default MainCardCarousel