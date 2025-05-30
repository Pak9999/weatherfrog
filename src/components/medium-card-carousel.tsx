

import React, { useEffect, useState } from "react";
import "./medium-card-carousel.css";

import MediumCard from "./medium-card";
import { getDetailedWeather } from "../services/weatherService"
/* import { WeatherDetailedResponse } from "../types/weather"
 */

interface MediumCardCarouselProps {
    carouselType: "favorites" | "recent";
    cardData: Array<{
        name: string;
        longitude: number;
        latitude: number;
    }>;
}

interface CardWeather {
    [key: string]: WeatherDetailedResponse | null;
}


const MediumCardCarousel: React.FC<MediumCardCarouselProps> = ({ carouselType, cardData }) => {
    const [weatherData, setWeatherData] = useState<CardWeather>({});

    useEffect(() => {
        cardData.forEach(async (card) => {
            const key = `${card.latitude},${card.longitude}`;
            if (!weatherData[key]) {
                try {
                    const data = await getDetailedWeather(card.latitude, card.longitude);
                    setWeatherData(prev => ({ ...prev, [key]: data }));
                } catch {
                    setWeatherData(prec => ({ ...prev, [key]: null }));
                }
            }
        });
    }, [cardData, weatherData]);

    return (
        <div className="medium-card-carousel-container">
            <h3>{carouselType === "favorites" ? "Favorites" : "Recent"}</h3>
            <div className="medium-card-carousel">
                {cardData.map((card, index) => {
                    const key = `${card.latitude},${card.longitude}`;
                    const weather = weatherData[key];
                    return (
                        <MediumCard
                            key={index}
                            locationName={card.name}
                            city="Sweden"
                            temperature={weather ? Math.round(weather.hourly.temperature_2m[0]).toString() : "--"}
                            weatherIcon="/src/assets/react.svg"
                            maxTemp={weather ? Math.round(weather.daily.temperature_2m_max[0]).toString() : "--"}
                            minTemp={weather ? Math.round(weather.daily.temperature_2m_min[0]).toString() : "--"}
                            precipitation={weather ? weather.hourly.precipitation[0].toString() : "--"}
                            wind={weather ? weather.hourly.wind_speed_100m[0].toString() : "--"}
                            longitude={cardData.longitude}
                            latitude={cardData.latitude}
                            
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default MediumCardCarousel;


