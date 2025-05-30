/* Carousel component that holds cards (hourly or weekly) related to location currently active in main-card */


import React from "react";
import useEmblaCarousel from 'embla-carousel-react';
import WeeklyCard from "./weekly-card";
import HourlyCard from "./hourly-card";

import "./main-card-carousel.css";

import type { WeatherDetailedResponse } from "../types/weather";


interface MainCardCarouselProps {
    forecastType: "hourly" | "weekly";
    weather: WeatherDetailedResponse;
    locationName?: string;
}


const MainCardCarousel: React.FC<MainCardCarouselProps> = ({ forecastType, weather }) => {
    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    });

    return (
        <div className="main-card-carousel-container">
            <h3>{forecastType === "hourly" ? "Hourly" : "Weekly"}</h3>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {forecastType === "hourly"
                        ? weather.hourly.time.slice(0, 12).map((time, idx) => (
                            <div className="embla__slide" key={time}>
                                <HourlyCard
                                    hour={time.slice(-5)}
                                    weatherIcon="/src/assets/react.svg"
                                    temperature={Math.round(weather.hourly.temperature_2m[idx]).toString()}
                                />
                            </div>
                        ))
                        : weather.daily.time.map((date, idx) => (
                            <div className="embla__slide" key={date}>
                                <WeeklyCard
                                    day={new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}
                                    date={date.slice(5)}
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp={Math.round(weather.daily.temperature_2m_max[idx]).toString()}
                                    minTemp={Math.round(weather.daily.temperature_2m_min[idx]).toString()}
                                />
                            </div>
                        ))
                    }

                    {/*                         <div className="embla__slide">
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
                                    <WeeklyCard 
                                        day="Mon"
                                        date="15/02"
                                        weatherIcon="/src/assets/react.svg"
                                        maxTemp="25°C"
                                        minTemp="15°C"
                                    />
                                </>
                            )
                            }
                        </div> */}
                </div>
            </div>
        </div>
    );

}

export default MainCardCarousel;