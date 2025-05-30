import { useState } from 'react';
import { searchLocation } from '../services/weatherService';
import type { GeocodingResponse } from '../types/weather';

import './location-search.css';

interface LocationSearchProps {
  onLocationSelect: (location: { name: string, latitude: number, longitude: number }) => void;
}

export default function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResponse['results']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchLocation(query);
      setResults(response.results || []);
      if (response.results?.length === 0) {
        setError('No locations found');
      }
    } catch (err) {
      setError('Error searching for location');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (location: GeocodingResponse['results'][0]) => {
    onLocationSelect({
      name: `${location.name}, ${location.country}${location.admin1 ? `, ${location.admin1}` : ''}`,
      latitude: location.latitude,
      longitude: location.longitude
    });
    setResults([]);
  };

  return (
    <div>
      <div className="location-search-card">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a location..."
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={isLoading} className='search-button'>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {error && <p>{error}</p>}
      
      {results.length > 0 && (
        <ul>
          {results.map((location) => (
            <li key={location.id}>
              <button onClick={() => handleSelectLocation(location)}>
                {location.name}, {location.country}{location.admin1 ? `, ${location.admin1}` : ''}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}