import { useState, useEffect } from 'react'
import './App.css'
import LocationSearch from './components/LocationSearch'
import WeatherDetailedView from './components/WeatherDetailedView'
import WeatherSimpleView from './components/WeatherSimpleView'
import { getDetailedWeather, getSimpleWeather, getFavorites, getRecentSearches, saveFavorite, saveRecentSearch } from './services/weatherService'
import type { WeatherDetailedResponse, WeatherSimpleResponse } from './types/weather'

function App() {
  const [selectedLocation, setSelectedLocation] = useState<{ name: string, latitude: number, longitude: number } | null>(null)
  const [detailedWeather, setDetailedWeather] = useState<WeatherDetailedResponse | null>(null)
  const [simpleWeather, setSimpleWeather] = useState<WeatherSimpleResponse | null>(null)
  const [viewType, setViewType] = useState<'simple' | 'detailed'>('simple')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Array<{ name: string, latitude: number, longitude: number }>>([])
  const [recentSearches, setRecentSearches] = useState<Array<{ name: string, latitude: number, longitude: number }>>([])

  // Load favorites and recent searches from localStorage on component mount
  useEffect(() => {
    setFavorites(getFavorites())
    setRecentSearches(getRecentSearches())
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
    </div>
  )
}

export default App
