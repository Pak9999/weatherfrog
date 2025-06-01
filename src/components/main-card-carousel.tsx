/* Carousel component that holds cards (hourly or weekly) related to location currently active in main-card */


import React from "react";
import useEmblaCarousel from 'embla-carousel-react';
import WeeklyCard from "./weekly-card";
import HourlyCard from "./hourly-card";
import { getWeatherIcon } from "../utils/weatherUtils";

import "./main-card-carousel.css";

import type { WeatherDetailedResponse } from "../types/weather";


interface MainCardCarouselProps {
    forecastType: "hourly" | "weekly";
    weather: WeatherDetailedResponse;
}


const MainCardCarousel: React.FC<MainCardCarouselProps> = ({ forecastType, weather }) => {
    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
        loop: false
    });

    const isDay = (time: string): boolean => {
        const hour = new Date(time).getHours();
        return hour >= 6 && hour < 20;
    };

    const getCurrentHourIndex = (): number => {
        const now = new Date();
        const currentHour = now.getHours();
        
        return weather.hourly.time.findIndex(time => {
            const timeHour = new Date(time).getHours();
            const timeDate = new Date(time).getDate();
            return timeHour === currentHour && timeDate === now.getDate();
        });
    };

    const getNext12Hours = () => {
        const startIndex = getCurrentHourIndex();
        if (startIndex === -1) return weather.hourly.time.slice(0, 12);
        return weather.hourly.time.slice(startIndex, startIndex + 12);
    };

    return (
        <div className="main-card-carousel-container">
            <h3>{forecastType === "hourly" ? "Hourly" : "Weekly"}</h3>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {forecastType === "hourly"
                        ? getNext12Hours().map((time, relativeIdx) => {
                            const absoluteIdx = getCurrentHourIndex() + relativeIdx;
                            return (
                                <div className="embla__slide" key={time}>
                                    <HourlyCard
                                    /* Must update this -- right now breaks when updating (searching) location to one that is one date ahead */
                                    /* !!!!!!!!  */
                                        hour={time.slice(-5)}
                                        weatherIcon={getWeatherIcon(weather.hourly.weather_code[absoluteIdx], isDay(time))}
                                        weatherType={weather.hourly.weather_code[absoluteIdx].toString()}
                                        temperature={Math.round(weather.hourly.temperature_2m[absoluteIdx]).toString()}
                                    />
                                </div>
                            );
                        })
                        : weather.daily.time.map((date, idx) => (
                            <div className="embla__slide" key={date}>
                                <WeeklyCard
                                    day={new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}
                                    date={date.slice(5)}
                                    weatherIcon={getWeatherIcon(weather.daily.weather_code[idx], true)}
                                    weatherType={weather.daily.weather_code[idx].toString()}
                                    maxTemp={Math.round(weather.daily.temperature_2m_max[idx]).toString()}
                                    minTemp={Math.round(weather.daily.temperature_2m_min[idx]).toString()}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );

}

export default MainCardCarousel;