import axios from 'axios';

/**
 * Base class for API providers.
 */
export class ApiProvider {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
  }

  /**
   * Makes a request to the API.
   * @param {string} endpoint - The API endpoint.
   * @param {object} params - The request parameters.
   * @returns {Promise<object>} The API response.
   */
  async request(endpoint, params) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`API request failed: ${error.message}`);
      throw new Error('Failed to fetch data from external API.');
    }
  }
}
