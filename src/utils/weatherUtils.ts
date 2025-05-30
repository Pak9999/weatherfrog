// Imports för väderikoner
import clearDay from '../assets/v4/clear_day.svg';
import clearNight from '../assets/v4/clear_night.svg';
import mostlyClearDay from '../assets/v4/mostly_clear_day.svg';
import mostlyClearNight from '../assets/v4/mostly_clear_night.svg';
import partlyCloudyDay from '../assets/v4/partly_cloudy_day.svg';
import partlyCloudyNight from '../assets/v4/partly_cloudy_night.svg';
import mostlyCloudyDay from '../assets/v4/mostly_cloudy_day.svg';
import mostlyCloudyNight from '../assets/v4/mostly_cloudy_night.svg';
//import cloudy from '../assets/v4/cloudy.svg';
import fog from '../assets/v4/haze_fog_dust_smoke.svg';
import drizzle from '../assets/v4/drizzle.svg';
import rainWithSunnyLight from '../assets/v4/rain_with_sunny_light.svg';
import rainWithSunnyDark from '../assets/v4/rain_with_sunny_dark.svg';
import showersRain from '../assets/v4/showers_rain.svg';
import heavyRain from '../assets/v4/heavy_rain.svg';
import rainWithCloudyLight from '../assets/v4/rain_with_cloudy_light.svg';
import rainWithCloudyDark from '../assets/v4/rain_with_cloudy_dark.svg';
import snowWithSunnyLight from '../assets/v4/snow_with_sunny_light.svg';
import snowWithSunnyDark from '../assets/v4/snow_with_sunny_dark.svg';
import showersSnow from '../assets/v4/showers_snow.svg';
import heavySnow from '../assets/v4/heavy_snow.svg';
import blizzard from '../assets/v4/blizzard.svg';
import mixedRainSnow from '../assets/v4/mixed_rain_snow.svg';
import sleetHail from '../assets/v4/sleet_hail.svg';
import thunderstormDay from '../assets/v4/isolated_scattered_thunderstorms_day.svg';
import thunderstormNight from '../assets/v4/isolated_scattered_thunderstorms_night.svg';

export const getWeatherIcon = (weatherCode: number, isDay: boolean = true): string => {
    const iconMap: { [key: number]: { day: string; night: string; description: string } } = {
        0: { day: clearDay, night: clearNight, description: "Clear sky" },
        1: { day: mostlyClearDay, night: mostlyClearNight, description: "Mainly clear" },
        2: { day: partlyCloudyDay, night: partlyCloudyNight, description: "Partly cloudy" },
        3: { day: mostlyCloudyDay, night: mostlyCloudyNight, description: "Overcast" },
        45: { day: fog, night: fog, description: "Fog" },
        48: { day: fog, night: fog, description: "Depositing rime fog" },
        51: { day: rainWithSunnyLight, night: rainWithSunnyDark, description: "Light drizzle" },
        53: { day: drizzle, night: drizzle, description: "Moderate drizzle" },
        55: { day: rainWithCloudyLight, night: rainWithCloudyDark, description: "Dense drizzle" },
        56: { day: sleetHail, night: sleetHail, description: "Light freezing drizzle" },
        57: { day: sleetHail, night: sleetHail, description: "Dense freezing drizzle" },
        61: { day: showersRain, night: showersRain, description: "Slight rain" },
        63: { day: rainWithCloudyLight, night: rainWithCloudyDark, description: "Moderate rain" },
        65: { day: heavyRain, night: heavyRain, description: "Heavy rain" },
        66: { day: sleetHail, night: sleetHail, description: "Light freezing rain" },
        67: { day: heavyRain, night: heavyRain, description: "Heavy freezing rain" },
        71: { day: snowWithSunnyLight, night: snowWithSunnyDark, description: "Slight snow" },
        73: { day: showersSnow, night: showersSnow, description: "Moderate snow" },
        75: { day: heavySnow, night: heavySnow, description: "Heavy snow" },
        77: { day: blizzard, night: blizzard, description: "Snow grains" },
        80: { day: rainWithSunnyLight, night: rainWithSunnyDark, description: "Slight rain showers" },
        81: { day: showersRain, night: showersRain, description: "Moderate rain showers" },
        82: { day: heavyRain, night: heavyRain, description: "Violent rain showers" },
        85: { day: mixedRainSnow, night: mixedRainSnow, description: "Slight snow showers" },
        86: { day: heavySnow, night: heavySnow, description: "Heavy snow showers" },
        95: { day: thunderstormDay, night: thunderstormNight, description: "Thunderstorm" },
        96: { day: thunderstormDay, night: thunderstormNight, description: "Thunderstorm with slight hail" },
        99: { day: thunderstormDay, night: thunderstormNight, description: "Thunderstorm with heavy hail" }
    };
    
    const weather = iconMap[weatherCode];
    if (!weather) return fog; // Använder fog som fallback 
    
    return isDay ? weather.day : weather.night;
};

export const getWeatherDescription = (weatherCode: number): string => {
    const iconMap: { [key: number]: { day: string; night: string; description: string } } = {
        0: { day: clearDay, night: clearNight, description: "Clear sky" },
        1: { day: mostlyClearDay, night: mostlyClearNight, description: "Mainly clear" },
        2: { day: partlyCloudyDay, night: partlyCloudyNight, description: "Partly cloudy" },
        3: { day: mostlyCloudyDay, night: mostlyCloudyNight, description: "Overcast" },
        45: { day: fog, night: fog, description: "Fog" },
        48: { day: fog, night: fog, description: "Depositing rime fog" },
        51: { day: rainWithSunnyLight, night: rainWithSunnyDark, description: "Light drizzle" },
        53: { day: drizzle, night: drizzle, description: "Moderate drizzle" },
        55: { day: rainWithCloudyLight, night: rainWithCloudyDark, description: "Dense drizzle" },
        56: { day: sleetHail, night: sleetHail, description: "Light freezing drizzle" },
        57: { day: sleetHail, night: sleetHail, description: "Dense freezing drizzle" },
        61: { day: showersRain, night: showersRain, description: "Slight rain" },
        63: { day: rainWithCloudyLight, night: rainWithCloudyDark, description: "Moderate rain" },
        65: { day: heavyRain, night: heavyRain, description: "Heavy rain" },
        66: { day: sleetHail, night: sleetHail, description: "Light freezing rain" },
        67: { day: heavyRain, night: heavyRain, description: "Heavy freezing rain" },
        71: { day: snowWithSunnyLight, night: snowWithSunnyDark, description: "Slight snow" },
        73: { day: showersSnow, night: showersSnow, description: "Moderate snow" },
        75: { day: heavySnow, night: heavySnow, description: "Heavy snow" },
        77: { day: blizzard, night: blizzard, description: "Snow grains" },
        80: { day: rainWithSunnyLight, night: rainWithSunnyDark, description: "Slight rain showers" },
        81: { day: showersRain, night: showersRain, description: "Moderate rain showers" },
        82: { day: heavyRain, night: heavyRain, description: "Violent rain showers" },
        85: { day: mixedRainSnow, night: mixedRainSnow, description: "Slight snow showers" },
        86: { day: heavySnow, night: heavySnow, description: "Heavy snow showers" },
        95: { day: thunderstormDay, night: thunderstormNight, description: "Thunderstorm" },
        96: { day: thunderstormDay, night: thunderstormNight, description: "Thunderstorm with slight hail" },
        99: { day: thunderstormDay, night: thunderstormNight, description: "Thunderstorm with heavy hail" }
    };
    
    return iconMap[weatherCode]?.description || "Unknown";
};

export const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('sv-SE', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', { 
        month: '2-digit', 
        day: '2-digit' 
    });
};

export const getDayName = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
        return "Idag";
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return "Imorgon";
    } else {
        return date.toLocaleDateString('sv-SE', { weekday: 'short' });
    }
};

export const isDay = (timeString: string, sunriseString?: string, sunsetString?: string): boolean => {
    if (!sunriseString || !sunsetString) {
        const hour = new Date(timeString).getHours();
        return hour >= 6 && hour < 18;
    }
    
    const time = new Date(timeString);
    const sunrise = new Date(sunriseString);
    const sunset = new Date(sunsetString);
    
    return time >= sunrise && time <= sunset;
};