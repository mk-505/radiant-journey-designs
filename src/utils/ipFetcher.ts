
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
