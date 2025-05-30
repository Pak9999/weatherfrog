import { useState, useRef, useEffect } from 'react';
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
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchLocation(query);
      setResults(response.results || []);
      setShowDropdown(response.results && response.results.length > 0);
      if (response.results?.length === 0) {
        setError('No locations found');
      }
    } catch (err) {
      setError('Error searching for location');
      console.error(err);
      setShowDropdown(false);
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
    setShowDropdown(false);
    setQuery(''); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setResults([]);
      setShowDropdown(false);
    }
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 150);
  };

  return (
    <div className="location-search-card">
      <div className="search-input-container" ref={searchContainerRef}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Search for a location..."
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={isLoading} className='search-button'>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        
        {showDropdown && results.length > 0 && (
          <ul className="search-results-dropdown">
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
      
      {error && <div className="search-error">{error}</div>}
    </div>
  );
}