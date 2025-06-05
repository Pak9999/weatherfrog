// This module provides a utility function to reverse geocode coordinates

// Keeps track of the last request time to enforce rate limiting
let lastRequestTime = 0;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Reverse geocode coordinates to get location information
 * Rate limited to 1 request per second to comply with Nominatim usage policy
 */
export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<{
  displayName: string;
  city?: string;
  state?: string;
  country?: string;
}> => {
  try {
    // Rate limiting: ensures at least 1000ms (1 second) between requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < 1000) {
      // Waits for the remaining time to complete 1 second
      await sleep(1000 - timeSinceLastRequest);
    }
    
    // Updates last request time
    lastRequestTime = Date.now();
    
    // Adds user-agent and accept-language headers for compliance with Nominatim's usage policy
    const headers = {
      'User-Agent': 'WeatherFrog/1.0 (Educational Project)',
      'Accept-Language': 'en-US,en;q=0.5'
    };
    
    // Fetches location data from Nominatim's reverse geocoding API
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`,
      { headers }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    
    // Validates the received data
    if (!data || !data.display_name) {
      throw new Error('Invalid location data received');
    }
    
    return {
      displayName: data.display_name,
      city: data.address?.city || data.address?.town || data.address?.village || data.address?.hamlet,
      state: data.address?.state,
      country: data.address?.country
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw error;
  }
};

export const getLocationNameFromCoords = reverseGeocode;