import { Trip } from '../models/trip.model.js';

class TripService {
  /**
   * Saves a new trip.
   * @param {object} tripData - The trip data.
   * @returns {Promise<object>} The saved trip.
   */
  async saveTrip(tripData) {
    return await Trip.create(tripData);
  }

  /**
   * Retrieves a trip by ID.
   * @param {string} tripId - The trip ID.
   * @returns {Promise<object>} The trip.
   */
  async getTrip(tripId) {
    return await Trip.findById(tripId);
  }
}

export const tripService = new TripService();
