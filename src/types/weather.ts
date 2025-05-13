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