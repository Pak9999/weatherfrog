import { useState, useEffect } from 'react'
import './App.css'
import LocationSearch from './components/LocationSearch'
import WeatherDetailedView from './components/WeatherDetailedView'
import WeatherSimpleView from './components/WeatherSimpleView'
import HistoricalWeatherChart from './components/HistoricalWeatherChart'
import { getDetailedWeather, getSimpleWeather, getFavorites, getRecentSearches, saveFavorite, saveRecentSearch } from './services/weatherService'
import { getLocationNameFromCoords } from './utils/geocoderUtil'
import type { WeatherDetailedResponse, WeatherSimpleResponse } from './types/weather'

function ApiApp() {
  const [selectedLocation, setSelectedLocation] = useState<{ name: string, latitude: number, longitude: number } | null>(null)
  const [detailedWeather, setDetailedWeather] = useState<WeatherDetailedResponse | null>(null)
  const [simpleWeather, setSimpleWeather] = useState<WeatherSimpleResponse | null>(null)
  const [viewType, setViewType] = useState<'simple' | 'detailed'>('simple')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Array<{ name: string, latitude: number, longitude: number }>>([])
  const [recentSearches, setRecentSearches] = useState<Array<{ name: string, latitude: number, longitude: number }>>([])
  const [userLatitude, setUserLatitude] = useState<number | null>(null)
  const [userLongitude, setUserLongitude] = useState<number | null>(null)

  // Load favorites and recent searches from localStorage on component mount
  useEffect(() => {
    setFavorites(getFavorites())
    setRecentSearches(getRecentSearches())

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLatitude(latitude)
          setUserLongitude(longitude)
          
          // Try to get location name using reverse geocoding
          try {
            const geoData = await getLocationNameFromCoords(latitude, longitude);
            const locationName = geoData.city || geoData.state || geoData.displayName.split(',')[0];
            setSelectedLocation({ 
              latitude, 
              longitude, 
              name: locationName || "Current Location"
            });
          } catch (geoError) {
            console.error("Error getting location name:", geoError);
            setSelectedLocation({ 
              latitude, 
              longitude, 
              name: "Current Location" 
            });
          }
        },
        (error) => {
          console.error("Error getting user location:", error)
          // Fallback to a default location if geolocation fails or is denied
          setUserLatitude(52.52) // Berlin as a fallback
          setUserLongitude(13.405)
          setSelectedLocation({ latitude: 52.52, longitude: 13.405, name: "Berlin (Fallback)" })
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
      // Fallback to a default location if geolocation is not supported
      setUserLatitude(52.52)
      setUserLongitude(13.405)
      setSelectedLocation({ latitude: 52.52, longitude: 13.405, name: "Berlin (Fallback)" })
    }
  }, [])

  const handleLocationSelect = async (location: { name: string, latitude: number, longitude: number }) => {
    setSelectedLocation(location)
    setLoading(true)
    setError(null)
    
    try {
      if (viewType === 'detailed') {
        const data = await getDetailedWeather(location.latitude, location.longitude)
        setDetailedWeather(data)
        setSimpleWeather(null)
      } else {
        const data = await getSimpleWeather(location.latitude, location.longitude)
        setSimpleWeather(data)
        setDetailedWeather(null)
      }
      
      // Save to recent searches
      saveRecentSearch(location)
      setRecentSearches(getRecentSearches())
    } catch (err) {
      console.error(err)
      setError('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleViewType = async () => {
    if (!selectedLocation) return
    
    const newViewType = viewType === 'simple' ? 'detailed' : 'simple'
    setViewType(newViewType)
    setLoading(true)
    
    try {
      if (newViewType === 'detailed') {
        const data = await getDetailedWeather(selectedLocation.latitude, selectedLocation.longitude)
        setDetailedWeather(data)
        setSimpleWeather(null)
      } else {
        const data = await getSimpleWeather(selectedLocation.latitude, selectedLocation.longitude)
        setSimpleWeather(data)
        setDetailedWeather(null)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToFavorites = () => {
    if (selectedLocation) {
      saveFavorite(selectedLocation)
      setFavorites(getFavorites())
    }
  }

  if (!selectedLocation) {
    return <div>Loading location...</div> // Or some other loading state
  }

  return (
    <div className="app-container">
      <h1>Weather Frog</h1>
      
      <div className="search-container">
        <LocationSearch onLocationSelect={handleLocationSelect} />
      </div>
      
      {loading && <p>Loading weather data...</p>}
      {error && <p className="error">{error}</p>}
      
      {selectedLocation && !loading && !error && (
        <div className="weather-controls">
          <button onClick={handleToggleViewType}>
            Switch to {viewType === 'simple' ? 'Detailed' : 'Simple'} View
          </button>
          <button onClick={handleAddToFavorites}>Add to Favorites</button>
        </div>
      )}
      
      {detailedWeather && selectedLocation && !loading && (
        <WeatherDetailedView 
          weather={detailedWeather} 
          locationName={selectedLocation.name} 
        />
      )}
      
      {simpleWeather && selectedLocation && !loading && (
        <WeatherSimpleView 
          weather={simpleWeather} 
          locationName={selectedLocation.name} 
        />
      )}
      
      <div className="saved-locations">
        {favorites.length > 0 && (
          <div className="favorites">
            <h3>Favorites</h3>
            <ul>
              {favorites.map((location, index) => (
                <li key={`fav-${index}`}>
                  <button onClick={() => handleLocationSelect(location)}>
                    {location.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <h3>Recent Searches</h3>
            <ul>
              {recentSearches.map((location, index) => (
                <li key={`recent-${index}`}>
                  <button onClick={() => handleLocationSelect(location)}>
                    {location.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="historical-weather-chart-section">
        {userLatitude && userLongitude && (
          <HistoricalWeatherChart 
            initialLatitude={userLatitude} 
            initialLongitude={userLongitude} 
            initialLocationName={selectedLocation.name} // Pass the name of the initially selected location
          />
        )}
      </div>
    </div>
  )
}

export default ApiApp
