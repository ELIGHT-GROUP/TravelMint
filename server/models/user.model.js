import { getDb } from '../utils/db.js';

/**
 * User schema definition.
 */
const userSchema = {
  username: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

/**
 * User model.
 */
export const User = {
  /**
   * Creates a new user.
   * @param {object} userData - The user data.
   * @returns {Promise<object>} The created user.
   */
  async create(userData) {
    const db = getDb();
    const result = await db.collection('users').insertOne(userData);
    return result.ops[0];
  },

  /**
   * Finds a user by ID.
   * @param {string} userId - The user ID.
   * @returns {Promise<object>} The user.
   */
  async findById(userId) {
    const db = getDb();
    return await db.collection('users').findOne({ _id: userId });
  },
};
