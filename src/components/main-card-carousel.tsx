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
        dragFree: true,
        loop: false
    });

    return (
        <div className="main-card-carousel-container">
            <h3>{forecastType === "hourly" ? "Hourly" : "Weekly"}</h3>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {forecastType === "hourly" ? (
                        <>
                            <div className="embla__slide">
                                <HourlyCard
                                    hour="14:00"
                                    weatherIcon="/src/assets/react.svg"
                                    temperature="-20°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <HourlyCard
                                    hour="15:00"
                                    weatherIcon="/src/assets/react.svg"
                                    temperature="22°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <HourlyCard
                                    hour="16:00"
                                    weatherIcon="/src/assets/react.svg"
                                    temperature="21°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <HourlyCard
                                    hour="17:00"
                                    weatherIcon="/src/assets/react.svg"
                                    temperature="19°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <HourlyCard
                                    hour="14:00"
                                    weatherIcon="/src/assets/react.svg"
                                    temperature="20°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <HourlyCard
                                    hour="15:00"
                                    weatherIcon="/src/assets/react.svg"
                                    temperature="22°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <HourlyCard
                                    hour="16:00"
                                    weatherIcon="/src/assets/react.svg"
                                    temperature="21°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <HourlyCard
                                    hour="17:00"
                                    weatherIcon="/src/assets/react.svg"
                                    temperature="19°C"
                                />
                            </div>
                        </>
                    ) : ( 
                        <>
                            <div className="embla__slide">
                                <WeeklyCard 
                                    day="Mon"
                                    date="15/02"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="25°C"
                                    minTemp="-15°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <WeeklyCard 
                                    day="Tue"
                                    date="16/02"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="23°C"
                                    minTemp="14°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <WeeklyCard 
                                    day="Wed"
                                    date="17/02"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="24°C"
                                    minTemp="16°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <WeeklyCard 
                                    day="Thu"
                                    date="18/02"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="25°C"
                                    minTemp="15°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <WeeklyCard 
                                    day="Fri"
                                    date="19/02"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="23°C"
                                    minTemp="14°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <WeeklyCard 
                                    day="Sat"
                                    date="20/02"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="24°C"
                                    minTemp="16°C"
                                />
                            </div>
                            <div className="embla__slide">
                                <WeeklyCard 
                                    day="Sun"
                                    date="21/02"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="24°C"
                                    minTemp="16°C"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MainCardCarousel;