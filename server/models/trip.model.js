import { getDb } from '../utils/db.js';

/**
 * Trip schema definition.
 */
const tripSchema = {
  userId: String,
  destination: String,
  startDate: Date,
  endDate: Date,
  budget: Number,
  itinerary: Object, // JSON object representing the full itinerary
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

/**
 * Trip model.
 */
export const Trip = {
  /**
   * Creates a new trip.
   * @param {object} tripData - The trip data.
   * @returns {Promise<object>} The created trip.
   */
  async create(tripData) {
    const db = getDb();
    const result = await db.collection('trips').insertOne(tripData);
    return result.ops[0];
  },

  /**
   * Finds a trip by ID.
   * @param {string} tripId - The trip ID.
   * @returns {Promise<object>} The trip.
   */
  async findById(tripId) {
    const db = getDb();
    return await db.collection('trips').findOne({ _id: tripId });
  },
};
