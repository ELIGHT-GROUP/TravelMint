import { tripService } from '../services/TripService.js';

/**
 * Controller for trip-related API endpoints.
 */
export const tripController = {
  /**
   * Saves a trip.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  async saveTrip(req, res) {
    try {
      const trip = await tripService.saveTrip(req.body);
      res.status(201).json(trip);
    } catch (error) {
      res.status(500).json({ message: 'Error saving trip', error: error.message });
    }
  },

  /**
   * Gets a trip by ID.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  async getTrip(req, res) {
    try {
      const trip = await tripService.getTrip(req.params.id);
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }
      res.json(trip);
    } catch (error) {
      res.status(500).json({ message: 'Error getting trip', error: error.message });
    }
  },
};
