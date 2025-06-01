/* Component for the main card, the location currently being displayed */
/* Holds main-card-head.tsx, main-card-details-list.tsx, hourly-list.tsx. weekly-list.tsx */

import React from "react";
import "./main-card.css";
import MainCardHead from "./main-card-head";
import MainCardDetails from "./main-card-details-list";
import MainCardCarousel from "./main-card-carousel";
import type { WeatherDetailedResponse } from "../types/weather";



interface MainCardProps {
    weather: WeatherDetailedResponse
    locationName: string;
    onFavoriteAdded?: () => void;
}

const MainCard: React.FC<MainCardProps> = ({ weather, locationName, onFavoriteAdded }) => {
    return (
        <>
            <div className="main-card-container">                <MainCardHead 
                    locationName={locationName}
                    country="Sweden"
                    temperature={Math.round(weather.hourly.temperature_2m[0]).toString()}
                    feelsLike={Math.round(weather.hourly.apparent_temperature[0]).toString()}
                    /* Update 2 below when coded weather codes to weather type */
                    weatherIcon="/src/assets/react.svg"
                    weatherType={weather.hourly.weather_code[0].toString()}
                    /* ----- */
                    maxTemp={Math.round(weather.daily.temperature_2m_max[0]).toString()}
                    minTemp={Math.round(weather.daily.temperature_2m_min[0]).toString()}
                    longitude={weather.longitude}
                    latitude={weather.latitude}
                    currentTime={weather.hourly.time[0]}
                    sunrise={weather.daily.sunrise[0]}
                    sunset={weather.daily.sunset[0]}
                    onFavoriteAdded={onFavoriteAdded}
                />
                <hr></hr>

                <MainCardDetails 
                    sunrise={weather.daily.sunrise[0].slice(-5)}
                    sunset={weather.daily.sunset[0].slice(-5)}
                    precipitation={weather.hourly.precipitation[0].toString()}
                    wind={weather.hourly.wind_speed_100m[0].toString()}
                    /* Add wind direction (need to code degrees into NESW) */
                    humidity={weather.hourly.relative_humidity_2m[0].toString()}
                    uvIndex={weather.daily.uv_index_max[0].toString()}
                />
                <hr></hr>

                <MainCardCarousel 
                    forecastType="hourly"
                    weather={weather}
                />
                <hr></hr>
                
                <MainCardCarousel 
                    forecastType="weekly"
                    weather={weather}
                />
            </div>
        </>
    );
}

export default MainCard;