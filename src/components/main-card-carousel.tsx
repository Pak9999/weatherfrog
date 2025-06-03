/* Carousel component that holds cards (hourly or weekly) related to location currently active in main-card */


import React from "react";
import useEmblaCarousel from 'embla-carousel-react';
import WeeklyCard from "./weekly-card";
import HourlyCard from "./hourly-card";
import { getWeatherIcon, isDay, getCurrentHourIndex, formatTime } from "../utils/weatherUtils";

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

    const getTimeZoneAwareCurrentHourIndex = (): number => {
        return getCurrentHourIndex(weather.hourly.time, weather.utc_offset_seconds);
    };

    const getNext12Hours = () => {
        const startIndex = getTimeZoneAwareCurrentHourIndex();
        if (startIndex === -1) return weather.hourly.time.slice(0, 12);
        return weather.hourly.time.slice(startIndex, startIndex + 12);
    };

    const getSunriseForDate = (timeString: string): string => {
        // Find the corresponding sunrise for the given time
        const timeDate = new Date(timeString).toDateString();
        for (let i = 0; i < weather.daily.time.length; i++) {
            const dailyDate = new Date(weather.daily.time[i]).toDateString();
            if (dailyDate === timeDate) {
                return weather.daily.sunrise[i];
            }
        }
        return weather.daily.sunrise[0]; // Fallback to first day
    };

    const getSunsetForDate = (timeString: string): string => {
        const timeDate = new Date(timeString).toDateString();
        for (let i = 0; i < weather.daily.time.length; i++) {
            const dailyDate = new Date(weather.daily.time[i]).toDateString();
            if (dailyDate === timeDate) {
                return weather.daily.sunset[i];
            }
        }
        return weather.daily.sunset[0]; // Fallback to first day
    };    return (
        <div className="main-card-carousel-container">
            <h3>{forecastType === "hourly" ? "Hourly" : "Weekly"}</h3>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {forecastType === "hourly"                        
                    ? getNext12Hours().map((time, relativeIdx) => {
                            const absoluteIdx = getTimeZoneAwareCurrentHourIndex() + relativeIdx;
                            const sunrise = getSunriseForDate(time);
                            const sunset = getSunsetForDate(time);
                            return (
                                <div className="embla__slide" key={time}>
                                    <HourlyCard
                                        hour={formatTime(time)}
                                        weatherIcon={getWeatherIcon(
                                            weather.hourly.weather_code[absoluteIdx], 
                                            isDay(time, sunrise, sunset)
                                        )}
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