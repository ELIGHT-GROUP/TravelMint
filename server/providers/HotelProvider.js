import { ApiProvider } from './ApiProvider.js';
import { config } from '../utils/config.js';

/**
 * Provider for hotel search APIs.
 * Replace with a real hotel API implementation.
 */
class HotelProvider extends ApiProvider {
  constructor() {
    super(config.hotelApiKey, 'https://api.hotelprovider.com/v1'); // Replace with actual API base URL
  }

  /**
   * Searches for hotels.
   * @param {object} query - The search query.
   * @returns {Promise<object>} The search results.
   */
  async searchHotels(query) {
    // This is a placeholder. Replace with a real API call.
    console.log('Searching for hotels with query:', query);
    // return this.request('/search', query);
    return { hotels: [] }; // Return mock data for now
  }
}

export const hotelProvider = new HotelProvider();
