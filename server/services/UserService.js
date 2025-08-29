import { User } from '../models/user.model.js';
import { Conversation } from '../models/conversation.model.js';

class UserService {
  /**
   * Gets a user by ID.
   * @param {string} userId - The user ID.
   * @returns {Promise<object>} The user.
   */
  async getUser(userId) {
    return await User.findById(userId);
  }

  /**
   * Gets the conversation history for a user.
   * @param {string} userId - The user ID.
   * @returns {Promise<Array<object>>} The conversation history.
   */
  async getConversationHistory(userId) {
    return await Conversation.findByUserId(userId);
  }
}

export const userService = new UserService();
