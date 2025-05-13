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
      
      <h3>Hourly Forecast (Next 24 Hours)</h3>
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
          </thead>
          <tbody>
            {weather.hourly.time.slice(0, 24).map((time, index) => (
              <tr key={time}>
                <td>{formatTime(time)}</td>
                <td>{weather.hourly.temperature_2m[index]}</td>
                <td>{weather.hourly.apparent_temperature[index]}</td>
                <td>{weather.hourly.weather_code[index]}</td>
                <td>{weather.hourly.wind_speed_100m[index]}</td>
                <td>{weather.hourly.wind_direction_100m[index]}</td>
                <td>{weather.hourly.relative_humidity_2m[index]}</td>
                <td>{weather.hourly.precipitation[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}