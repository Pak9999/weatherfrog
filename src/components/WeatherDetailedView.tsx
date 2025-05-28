import type { WeatherDetailedResponse } from '../types/weather';

interface WeatherDetailedViewProps {
  weather: WeatherDetailedResponse;
  locationName: string;
}

export default function WeatherDetailedView({ weather, locationName }: WeatherDetailedViewProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const getNext24Hours = () => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Find the index of the current hour in the API data
    const currentHourIndex = weather.hourly.time.findIndex(timeString => {
      const timeDate = new Date(timeString);
      return timeDate.getDate() === now.getDate() && 
             timeDate.getMonth() === now.getMonth() && 
             timeDate.getFullYear() === now.getFullYear() &&
             timeDate.getHours() === currentHour;
    });
    
    // If we can't find the current hour, start from index 0
    const startIndex = currentHourIndex >= 0 ? currentHourIndex : 0;
    
    // Get the next 24 hours starting from current hour
    return {
      time: weather.hourly.time.slice(startIndex, startIndex + 24),
      temperature_2m: weather.hourly.temperature_2m.slice(startIndex, startIndex + 24),
      apparent_temperature: weather.hourly.apparent_temperature.slice(startIndex, startIndex + 24),
      weather_code: weather.hourly.weather_code.slice(startIndex, startIndex + 24),
      wind_speed_100m: weather.hourly.wind_speed_100m.slice(startIndex, startIndex + 24),
      wind_direction_100m: weather.hourly.wind_direction_100m.slice(startIndex, startIndex + 24),
      relative_humidity_2m: weather.hourly.relative_humidity_2m.slice(startIndex, startIndex + 24),
      precipitation: weather.hourly.precipitation.slice(startIndex, startIndex + 24)
    };
  };

  const next24Hours = getNext24Hours();

  return (
    <div>
      <h2>Detailed Weather for {locationName}</h2>
      
      <h3>Daily Forecast</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Min Temp (°C)</th>
              <th>Max Temp (°C)</th>
              <th>UV Index</th>
              <th>Sunrise</th>
              <th>Sunset</th>
            </tr>
          </thead>
          <tbody>
            {weather.daily.time.map((time, index) => (
              <tr key={time}>
                <td>{new Date(time).toLocaleDateString()}</td>
                <td>{weather.daily.temperature_2m_min[index]}</td>
                <td>{weather.daily.temperature_2m_max[index]}</td>
                <td>{weather.daily.uv_index_max[index]}</td>
                <td>{formatTime(weather.daily.sunrise[index])}</td>
                <td>{formatTime(weather.daily.sunset[index])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h3>Hourly Forecast (Next 24 Hours from {formatTime(next24Hours.time[0] || new Date().toISOString())})</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temp (°C)</th>
              <th>Feels Like (°C)</th>
              <th>Weather</th>
              <th>Wind Speed (m/s)</th>
              <th>Wind Dir (°)</th>
              <th>Humidity (%)</th>
              <th>Precipitation (mm)</th>
            </tr>
          </thead>          <tbody>
            {next24Hours.time.map((time, index) => (
              <tr key={time}>
                <td>{formatTime(time)}</td>
                <td>{next24Hours.temperature_2m[index]}</td>
                <td>{next24Hours.apparent_temperature[index]}</td>
                <td>{next24Hours.weather_code[index]}</td>
                <td>{next24Hours.wind_speed_100m[index]}</td>
                <td>{next24Hours.wind_direction_100m[index]}</td>
                <td>{next24Hours.relative_humidity_2m[index]}</td>
                <td>{next24Hours.precipitation[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}