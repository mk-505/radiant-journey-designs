
/**
 * Utility function to fetch the user's IP address
 * @returns Promise that resolves to the user's IP address
 */
export async function fetchIpAddress(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return 'Unable to fetch IP address';
  }
}

/**
 * Utility function to fetch the user's geolocation
 * @returns Promise that resolves to an object containing latitude and longitude
 */
export async function fetchGeolocation(): Promise<{ latitude: string; longitude: string }> {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
        },
        () => {
          // Error or user denied location permission
          resolve({
            latitude: 'Location access denied',
            longitude: 'Location access denied'
          });
        }
      );
    } else {
      // Geolocation not supported
      resolve({
        latitude: 'Geolocation not supported',
        longitude: 'Geolocation not supported'
      });
    }
  });
}
