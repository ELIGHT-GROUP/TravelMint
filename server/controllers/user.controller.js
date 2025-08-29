import { userService } from '../services/UserService.js';

/**
 * Controller for user-related API endpoints.
 */
export const userController = {
  /**
   * Gets the conversation history for a user.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  async getConversationHistory(req, res) {
    try {
      const history = await userService.getConversationHistory(req.params.id);
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: 'Error getting conversation history', error: error.message });
    }
  },
};
