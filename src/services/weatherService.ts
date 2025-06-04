import axios from 'axios';
import type { GeocodingResponse, WeatherDetailedResponse, WeatherSimpleResponse, HistoricalWeatherData } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const searchLocation = async (query: string): Promise<GeocodingResponse> => {
  const response = await axios.get(GEO_URL, {
    params: {
      name: query,
      count: 5,
      language: 'en',
      format: 'json'
    }
  });
  return response.data;
};

export const getDetailedWeather = async (latitude: number, longitude: number): Promise<WeatherDetailedResponse> => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      latitude,
      longitude, 
      hourly: 'temperature_2m,apparent_temperature,weather_code,wind_speed_100m,wind_direction_100m,relative_humidity_2m,precipitation',
      daily: 'temperature_2m_min,temperature_2m_max,uv_index_max,sunrise,sunset,weather_code',
      temperature_unit: 'celsius',
      wind_speed_unit: 'ms',
      timezone: 'auto'
    }
  });
  return response.data;
};

export const getSimpleWeather = async (latitude: number, longitude: number): Promise<WeatherSimpleResponse> => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      latitude,
      longitude,
      hourly: 'weather_code,temperature_2m,apparent_temperature,precipitation',
      daily: 'temperature_2m_max,temperature_2m_min',
      temperature_unit: 'celsius',
      timezone: 'auto'
    }
  });
  return response.data;
};

export const saveFavorite = (location: { name: string, latitude: number, longitude: number }): void => {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.name === location.name)) {
    favorites.unshift(location);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

export const getFavorites = (): Array<{ name: string, latitude: number, longitude: number }> => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const removeFavorite = (location: { name: string, latitude: number, longitude: number }): void => {
  const favorites = getFavorites();
  const tolerance = 0.0001; 
  
  const filteredFavorites = favorites.filter(fav => {
    const latDiff = Math.abs(fav.latitude - location.latitude);
    const lonDiff = Math.abs(fav.longitude - location.longitude);
    
    
    return latDiff > tolerance || lonDiff > tolerance;
  });
  
  localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
};

export const saveRecentSearch = (location: { name: string, latitude: number, longitude: number }): void => {
  const recentSearches = getRecentSearches();
  

  const filteredSearches = recentSearches.filter(search =>
    search.name !== location.name
  );

  filteredSearches.unshift(location);

  const trimmed = filteredSearches.slice(0, 5);

  localStorage.setItem('recentSearches', JSON.stringify(trimmed));
};


export const getRecentSearches = (): Array<{ name: string, latitude: number, longitude: number }> => {
  const searches = localStorage.getItem('recentSearches');
  return searches ? JSON.parse(searches) : [];
};

export const fetchHistoricalWeather = async (
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
): Promise<HistoricalWeatherData> => {
  const response = await axios.get('https://archive-api.open-meteo.com/v1/archive', {
    params: {
      latitude,
      longitude,
      start_date: startDate,
      end_date: endDate,
      daily: [
        /* "weathercode",
        "temperature_2m_max",
        "temperature_2m_min",
        "apparent_temperature_max",
        "apparent_temperature_min", */
        "temperature_2m_mean" // only one currently used
        /* "sunrise",
        "sunset",
        "precipitation_sum",
        "rain_sum",
        "snowfall_sum",
        "precipitation_hours",
        "windspeed_10m_max",
        "windgusts_10m_max",
        "winddirection_10m_dominant",
        "shortwave_radiation_sum",
        "et0_fao_evapotranspiration", */
      ].join(","),
      timezone: "auto",
    }
  });
  return response.data;
};