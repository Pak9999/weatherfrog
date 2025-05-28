/* Carousel component that holds cards (hourly or weekly) related to location currently active in main-card */


import React from "react";
import useEmblaCarousel from 'embla-carousel-react';
import WeeklyCard from "./weekly-card";
import HourlyCard from "./hourly-card";

import "./main-card-carousel.css";


interface MainCardCarouselProps {
    forecastType: "hourly" | "weekly";
}


const MainCardCarousel: React.FC<MainCardCarouselProps> = ({ forecastType }) => {
    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    });

    return (
        <>
            <div className="main-card-carousel-container">
                <h3>{forecastType === "hourly" ? "Hourly" : "Weekly"}</h3>
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                        <div className="embla__slide">
                            {forecastType === "hourly" ? (
                                <>
                                    <HourlyCard
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
                            )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainCardCarousel;