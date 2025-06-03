import React, { useEffect, useState, useRef } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import "./medium-card-carousel.css";
import MediumCard from "./medium-card";
import { getDetailedWeather } from "../services/weatherService"
import { formatWindData, getCurrentHourIndex } from "../utils/weatherUtils";
import type { WeatherDetailedResponse } from "../types/weather";


interface MediumCardCarouselProps {
    carouselType: "favorites" | "recent";
    cardData: Array<{
        name: string;
        longitude: number;
        latitude: number;
    }>;
    onRemoveFavorite?: (location: { name: string, latitude: number, longitude: number }) => void;
    onCardClick?: (location: { name: string, latitude: number, longitude: number }) => void;
}

interface CardWeather {
    [key: string]: {
        data: WeatherDetailedResponse | null;
        timestamp: number;
    };
}

const CACHE_DURATION = 10 * 60 * 1000;

const MediumCardCarousel: React.FC<MediumCardCarouselProps> = ({ carouselType, cardData, onRemoveFavorite, onCardClick }) => {
    const [weatherData, setWeatherData] = useState<CardWeather>({});
    const fetchedKeys = useRef<Set<string>>(new Set());

    useEffect(() => {
        const fetchWeatherForCards = async () => {
            const promises = cardData.map(async (card) => {
                const key = `${card.latitude},${card.longitude}`;
                const now = Date.now();
                const cached = weatherData[key];
                
                const shouldFetch = !cached || (now - cached.timestamp) > CACHE_DURATION;
                
                if (shouldFetch && !fetchedKeys.current.has(key)) {
                    fetchedKeys.current.add(key);
                    try {
                        const data = await getDetailedWeather(card.latitude, card.longitude);
                        setWeatherData(prev => ({ 
                            ...prev, 
                            [key]: { data, timestamp: now }
                        }));
                    } catch (error) {
                        console.error(`Failed to fetch weather for ${card.name}:`, error);
                        setWeatherData(prev => ({ 
                            ...prev, 
                            [key]: { data: null, timestamp: now }
                        }));
                    } finally {
                        fetchedKeys.current.delete(key);
                    }
                }
            });
            
            await Promise.all(promises);
        };        if (cardData.length > 0) {
            fetchWeatherForCards();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardData]);

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
                        const weatherEntry = weatherData[key];
                        const weather = weatherEntry?.data;
                        const currentHourIndex = weather ? getCurrentHourIndex(weather.hourly.time, weather.utc_offset_seconds) : 0;
                        const safeCurrentHourIndex = Math.max(0, Math.min(currentHourIndex, (weather?.hourly.time.length ?? 1) - 1));
                        
                        return (
                            <div className="medium-embla__slide" key={key}>
                                <MediumCard
                                    locationName={card.name.split(",")[0] || ""}
                                    country={card.name.split(",")[1] || ""}
                                    temperature={weather ? Math.round(weather.hourly.temperature_2m[safeCurrentHourIndex]).toString() : "--"}
                                    weatherIcon={weather ? weather.hourly.weather_code[safeCurrentHourIndex].toString() : "0"}
                                    weatherType={weather ? weather.hourly.weather_code[safeCurrentHourIndex].toString() : "0"}
                                    maxTemp={weather ? Math.round(weather.daily.temperature_2m_max[0]).toString() : "--"}
                                    minTemp={weather ? Math.round(weather.daily.temperature_2m_min[0]).toString() : "--"}
                                    precipitation={weather ? weather.hourly.precipitation[safeCurrentHourIndex].toString() : "--"}
                                    wind={weather ? formatWindData(weather.hourly.wind_speed_100m[safeCurrentHourIndex], weather.hourly.wind_direction_100m[safeCurrentHourIndex]) : "--"}
                                    currentTime={weather ? weather.hourly.time[safeCurrentHourIndex] : undefined}
                                    sunrise={weather ? weather.daily.sunrise[0] : undefined}
                                    sunset={weather ? weather.daily.sunset[0] : undefined}
                                    showRemoveButton={carouselType === "favorites"}
                                    onRemove={() => onRemoveFavorite && onRemoveFavorite(card)}
                                    onClick={() => onCardClick && onCardClick(card)}
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


