import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
} from 'chart.js';
import { fetchHistoricalWeather } from '../services/weatherService';
import type { HistoricalWeatherData, HistoricalWeatherLocation } from '../types/weather';
import LocationSearch from './location-search';
import { reverseGeocode } from '../utils/geocoderUtil';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HistoricalWeatherChartProps {
  initialLatitude: number;
  initialLongitude: number;
  initialLocationName?: string;
}

const HistoricalWeatherChart: React.FC<HistoricalWeatherChartProps> = ({ initialLatitude, initialLongitude, initialLocationName = "Current Location" }) => {
  const [chartData, setChartData] = useState<ChartData<'line', number[], string> | null>(null);  
  const [startDate, setStartDate] = useState<string>(() => {
    // Default to today's date but adjust the year based on the current view
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [locations, setLocations] = useState<HistoricalWeatherLocation[]>([
    { id: 'initial', name: initialLocationName, latitude: initialLatitude, longitude: initialLongitude }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get location name for initial location if it's just "Current Location"
  useEffect(() => {
    const getLocationName = async () => {
      if (initialLocationName === "Current Location" || initialLocationName === "Berlin (Fallback)") {
        try {
          const geoData = await reverseGeocode(initialLatitude, initialLongitude);
          const locationName = geoData.city || geoData.state || geoData.displayName.split(',')[0];
          
          setLocations(prev => 
            prev.map(loc => 
              loc.id === 'initial' 
                ? { ...loc, name: `${locationName}` } 
                : loc
            )
          );
        } catch (err) {
          console.error("Could not get location name:", err);
          // Keep the default name if reverse geocoding fails
        }
      }
    };

    getLocationName();
  }, [initialLatitude, initialLongitude, initialLocationName]);

  useEffect(() => {
    const fetchDataForAllLocations = async () => {
      if (locations.length === 0) {
        setChartData(null);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        let commonLabels: string[] = [];

        const datasets = (await Promise.all(
          locations.map(async (location, index) => {  // Get the selected date parts (month and day)
            const selectedDate = new Date(startDate);
            const selectedMonth = selectedDate.getMonth();
            const selectedDay = selectedDate.getDate();
            
            // Array to store temperature data for each of the 5 years
            const yearlyTemps: number[][] = [];
            
            // Get today's date for comparison
            const today = new Date();
            
            // Fetch data for 5 previous years (not including current year)
            const currentYear = new Date().getFullYear();
            for (let yearOffset = 1; yearOffset <= 5; yearOffset++) {
              const year = currentYear - yearOffset;
              
              // Create date objects for this year with the selected month/day
              const yearStartDate = new Date(year, selectedMonth, selectedDay);
              
              // Skip years where the start date would be in the future
              if (yearStartDate > today) {
                console.log(`Skipping year ${year} as the date would be in the future`);
                continue;
              }
              
              const yearEndDate = new Date(yearStartDate);
              yearEndDate.setDate(yearEndDate.getDate() + 6); // 7-day period
              
              // Format dates for API call
              const formattedYearStartDate = yearStartDate.toISOString().split('T')[0];
              const formattedYearEndDate = yearEndDate.toISOString().split('T')[0];
              
              try {
                const yearData: HistoricalWeatherData = await fetchHistoricalWeather(
                  location.latitude,
                  location.longitude,
                  formattedYearStartDate,
                  formattedYearEndDate
                );
                
                if (yearData.daily && yearData.daily.temperature_2m_mean) {
                  yearlyTemps.push(yearData.daily.temperature_2m_mean);
                    // Use the first fetched year's dates for the labels (most recent historical year)
                  if (yearOffset === 1 && index === 0) {
                    commonLabels = yearData.daily.time.map(date => {
                      const d = new Date(date);
                      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                    });
                  }
                }
              } catch (yearError) {
                console.error(`Error fetching data for year ${year}:`, yearError);
                // If we can't get data for a specific year, we'll just skip it
              }
            }
            
            // Calculate 5-year average for each day
            const fiveYearAvgTemp: number[] = [];
            
            // We need data for at least one year
            if (yearlyTemps.length > 0) {
              // For each day in the 7-day period
              for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                let total = 0;
                let validYearCount = 0;
                
                // Sum temperatures for this day across all available years
                for (let yearIndex = 0; yearIndex < yearlyTemps.length; yearIndex++) {
                  if (yearlyTemps[yearIndex] && yearlyTemps[yearIndex][dayIndex] !== undefined) {
                    total += yearlyTemps[yearIndex][dayIndex];
                    validYearCount++;
                  }
                }
                
                // Calculate average if we have data
                fiveYearAvgTemp.push(validYearCount > 0 ? total / validYearCount : NaN);
              }
            }
            
            const colorBase = getRandomColorValues();
            
            // Return the dataset with the 5-year average
            return [
              {
                label: `${location.name} 5-Year Avg Temp`,
                data: fiveYearAvgTemp,
                borderColor: `rgba(${colorBase.r}, ${colorBase.g}, ${colorBase.b}, 1)`,
                backgroundColor: `rgba(${colorBase.r}, ${colorBase.g}, ${colorBase.b}, 0.5)`,
                tension: 0.1,
              }
            ];
          })
        )).flat(); // Flatten the array of arrays

        setChartData({
          labels: commonLabels,
          datasets,
        });
      } catch (err) {
        setError('Failed to fetch historical weather data. Please check the console for more details.');
        console.error(err);
        setChartData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataForAllLocations();
  }, [startDate, locations]);

  const handleLocationAdd = (location: { name: string; latitude: number; longitude: number }) => {
    if (locations.length < 5) {
      if (!locations.find(l => l.latitude === location.latitude && l.longitude === location.longitude)){
        setLocations([...locations, { ...location, id: Date.now().toString() }]);
      } else {
        alert('This location has already been added.');
      }
    } else {
      alert('Maximum of 5 locations can be added.');
    }
  };

  const handleLocationRemove = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const getRandomColorValues = () => {
    const r = Math.floor(Math.random() * 200) + 25; 
    const g = Math.floor(Math.random() * 200) + 25;
    const b = Math.floor(Math.random() * 200) + 25;
    return { r, g, b };
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };
  return (
    <div className="historical-weather-chart-container">
      <h3>Historical Weather Data (5-Year Average)</h3>
      <div className="selected-location-title">
        {locations.length === 1 ? 
          `Your current location is ${locations[0].name}` : 
          `Showing data for ${locations.length} locations`
        }
      </div>
      <div className="controls">
        <div>
          <label htmlFor="start-date">Select Start Date: </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleDateChange}
          />
        </div>
        <LocationSearch onLocationSelect={handleLocationAdd} />
      </div>
      <div className="selected-locations">
        <h4>Selected Locations (Max 5):</h4>
        <ul>
          {locations.map(loc => (
            <li key={loc.id}>
              {loc.name}
              {loc.id !== 'initial' && 
                <button onClick={() => handleLocationRemove(loc.id)} className="remove-btn">
                  &times;
                </button>
              }
            </li>
          ))}
        </ul>
      </div>
      {isLoading && <p>Loading historical weather data...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && chartData && chartData.labels && chartData.labels.length > 0 && chartData.datasets.length > 0 ? (
        <div className="chart-wrapper">
          <Line data={chartData} />
        </div>
      ) : (
        !isLoading && !error && <p>No data to display. Add locations or check the selected date and ensure they have historical data.</p>
      )}
    </div>
  );
};

export default HistoricalWeatherChart;
