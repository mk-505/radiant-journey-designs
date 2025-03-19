
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
      // Add a timeout in case geolocation hangs
      const timeoutId = setTimeout(() => {
        console.log('Geolocation timed out');
        resolve({
          latitude: 'Geolocation timed out',
          longitude: 'Geolocation timed out'
        });
      }, 5000);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          console.log('Geolocation success:', position.coords);
          resolve({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
        },
        (error) => {
          clearTimeout(timeoutId);
          console.error('Geolocation error:', error.message);
          resolve({
            latitude: `Location access denied: ${error.message}`,
            longitude: `Location access denied: ${error.message}`
          });
        },
        { timeout: 4000, enableHighAccuracy: false }
      );
    } else {
      console.log('Geolocation not supported by browser');
      resolve({
        latitude: 'Geolocation not supported',
        longitude: 'Geolocation not supported'
      });
    }
  });
}
