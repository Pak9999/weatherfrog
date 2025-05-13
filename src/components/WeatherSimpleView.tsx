import type { WeatherSimpleResponse } from '../types/weather';

interface WeatherSimpleViewProps {
  weather: WeatherSimpleResponse;
  locationName: string;
}

export default function WeatherSimpleView({ weather, locationName }: WeatherSimpleViewProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div>
      <h2>Weather for {locationName}</h2>
      
      <h3>Daily Forecast</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Min Temp (°C)</th>
              <th>Max Temp (°C)</th>
            </tr>
          </thead>
          <tbody>
            {weather.daily.time.map((time, index) => (
              <tr key={time}>
                <td>{new Date(time).toLocaleDateString()}</td>
                <td>{weather.daily.temperature_2m_min[index]}</td>
                <td>{weather.daily.temperature_2m_max[index]}</td>
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
              <th>Weather Code</th>
              <th>Temp (°C)</th>
              <th>Feels Like (°C)</th>
              <th>Precipitation (mm)</th>
            </tr>
          </thead>
          <tbody>
            {weather.hourly.time.slice(0, 24).map((time, index) => (
              <tr key={time}>
                <td>{formatTime(time)}</td>
                <td>{weather.hourly.weather_code[index]}</td>
                <td>{weather.hourly.temperature_2m[index]}</td>
                <td>{weather.hourly.apparent_temperature[index]}</td>
                <td>{weather.hourly.precipitation[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}