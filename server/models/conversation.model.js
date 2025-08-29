import { getDb } from '../utils/db.js';

/**
 * Conversation schema definition.
 */
const conversationSchema = {
  userId: String,
  messages: [
    {
      sender: String, // 'user' or 'bot'
      content: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

/**
 * Conversation model.
 */
export const Conversation = {
  /**
   * Creates a new conversation.
   * @param {object} conversationData - The conversation data.
   * @returns {Promise<object>} The created conversation.
   */
  async create(conversationData) {
    const db = getDb();
    const result = await db.collection('conversations').insertOne(conversationData);
    return result.ops[0];
  },

  /**
   * Finds conversations by user ID.
   * @param {string} userId - The user ID.
   * @returns {Promise<Array<object>>} The conversations.
   */
  async findByUserId(userId) {
    const db = getDb();
    return await db.collection('conversations').find({ userId }).toArray();
  },
};
