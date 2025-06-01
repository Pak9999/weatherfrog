import React, { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import "./medium-card-carousel.css";
import MediumCard from "./medium-card";
import { getDetailedWeather } from "../services/weatherService"
import type { WeatherDetailedResponse } from "../types/weather";


interface MediumCardCarouselProps {
    carouselType: "favorites" | "recent";
    cardData: Array<{
        name: string;
        longitude: number;
        latitude: number;
    }>;
    onRemoveFavorite?: (location: { name: string, latitude: number, longitude: number }) => void;
}

interface CardWeather {
    [key: string]: WeatherDetailedResponse | null;
}


const MediumCardCarousel: React.FC<MediumCardCarouselProps> = ({ carouselType, cardData, onRemoveFavorite }) => {
    const [weatherData, setWeatherData] = useState<CardWeather>({});

    useEffect(() => {
        console.log("Fetching weather data for cards:", cardData);
        cardData.forEach(async (card) => {
            const key = `${card.latitude},${card.longitude}`;
            if (!weatherData[key]) {
                try {
                    const data = await getDetailedWeather(card.latitude, card.longitude);
                    setWeatherData(prev => ({ ...prev, [key]: data }));
                } catch {
                    setWeatherData(prev => ({ ...prev, [key]: null }));
                }
            }
        });
    }, [cardData, weatherData]);

    const [emblaRef] = useEmblaCarousel({
            align: 'start',
            containScroll: 'trimSnaps',
            dragFree: true,
            loop: false
        });
    
    return (
        <div className="medium-card-carousel-container">
            <h3>{carouselType === "favorites" ? "Favorites" : "Recent"}</h3>
            <div className="medium-embla" ref={emblaRef}>
                <div className="medium-embla__container">
                    
                    {cardData.map((card) => {
                        const key = `${card.latitude},${card.longitude}`;
                        const weather = weatherData[key];
                        return (
                            <div className="medium-embla__slide" key={key}>
                                <MediumCard
                                    locationName={card.name.split(",")[0] || ""}
                                    country={card.name.split(",")[1] || ""}
                                    temperature={weather ? Math.round(weather.hourly.temperature_2m[0]).toString() : "--"}
                                    weatherIcon={weather ? weather.hourly.weather_code[0].toString() : "0"}
                                    weatherType={weather ? weather.hourly.weather_code[0].toString() : "0"}
                                    maxTemp={weather ? Math.round(weather.daily.temperature_2m_max[0]).toString() : "--"}
                                    minTemp={weather ? Math.round(weather.daily.temperature_2m_min[0]).toString() : "--"}
                                    precipitation={weather ? weather.hourly.precipitation[0].toString() : "--"}
                                    wind={weather ? weather.hourly.wind_speed_100m[0].toString() : "--"}
                                    currentTime={weather ? weather.hourly.time[0] : undefined}
                                    sunrise={weather ? weather.daily.sunrise[0] : undefined}
                                    sunset={weather ? weather.daily.sunset[0] : undefined}
                                    showRemoveButton={carouselType === "favorites"}
                                    onRemove={() => onRemoveFavorite && onRemoveFavorite(card)}
                                />
                            </div>
                    );
                })}
                </div>
            </div>
        </div>
    );
};

export default MediumCardCarousel;


