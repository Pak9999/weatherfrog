// Keep track of the last request time to enforce rate limiting
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
    // Rate limiting: ensure at least 1000ms (1 second) between requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < 1000) {
      // Wait for the remaining time to complete 1 second
      await sleep(1000 - timeSinceLastRequest);
    }
    
    // Update last request time
    lastRequestTime = Date.now();
    
    // Added a user agent as required by Nominatim usage policy
    const headers = {
      'User-Agent': 'WeatherFrog/1.0 (Educational Project)',
      'Accept-Language': 'en-US,en;q=0.5'
    };
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`,
      { headers }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    
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