export interface WeatherDetailedResponse {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    weather_code: number[];
    wind_speed_100m: number[];
    wind_direction_100m: number[];
    relative_humidity_2m: number[];
    precipitation: number[];
  };
  daily: {
    time: string[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    uv_index_max: number[];
    sunrise: string[];
    sunset: string[];
    weather_code: number[];
  };
}

export interface WeatherSimpleResponse {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
    weather_code: number[];
    temperature_2m: number[];
    apparent_temperature: number[];
    precipitation: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface GeocodingResponse {
  results: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
  }>;
}

export interface HistoricalWeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    /* weathercode: string;
    temperature_2m_max: string;
    temperature_2m_min: string; */
    temperature_2m_mean: string;
    /* apparent_temperature_max: string;
    apparent_temperature_min: string;
    sunrise: string;
    sunset: string;
    precipitation_sum: string;
    rain_sum: string;
    snowfall_sum: string;
    precipitation_hours: string;
    windspeed_10m_max: string;
    windgusts_10m_max: string;
    winddirection_10m_dominant: string;
    shortwave_radiation_sum: string;
    et0_fao_evapotranspiration: string; */
  };
  daily: {
    time: string[];
    /* weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[]; */
    temperature_2m_mean: number[];
    /* apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    sunrise: string[];
    sunset: string[];
    precipitation_sum: number[];
    rain_sum: number[];
    snowfall_sum: number[];
    precipitation_hours: number[];
    windspeed_10m_max: number[];
    windgusts_10m_max: number[];
    winddirection_10m_dominant: number[];
    shortwave_radiation_sum: number[];
    et0_fao_evapotranspiration: number[]; */
  };
}

export interface HistoricalWeatherLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}