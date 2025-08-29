import { GeminiProvider } from '../providers/GeminiProvider.js';
import { toolService } from './ToolService.js';
import { getRedis } from '../utils/redis.js';

class ChatService {
  constructor() {
    this.llmProvider = new GeminiProvider();
    this.redis = getRedis();
  }

  /**
   * Handles a user message.
   * @param {string} sessionId - The session ID.
   * @param {string} message - The user's message.
   * @param {function} onStream - The callback for streaming responses.
   */
  async handleUserMessage(sessionId, message, onStream) {
    const sessionContext = await this.getSessionContext(sessionId);
    sessionContext.history.push({ role: 'user', parts: [{ text: message }] });

    const stream = await this.llmProvider.generateResponse(
      message,
      sessionContext,
      toolService.getTools()
    );

    let fullResponse = '';
    for await (const chunk of stream) {
      const text = chunk.text();
      fullResponse += text;
      onStream({ type: 'chunk', content: text });
    }

    sessionContext.history.push({ role: 'model', parts: [{ text: fullResponse }] });
    await this.saveSessionContext(sessionId, sessionContext);

    onStream({ type: 'end' });
  }

  /**
   * Gets the session context from Redis.
   * @param {string} sessionId - The session ID.
   * @returns {Promise<object>} The session context.
   */
  async getSessionContext(sessionId) {
    const context = await this.redis.get(`session:${sessionId}`);
    return context ? JSON.parse(context) : { history: [] };
  }

  /**
   * Saves the session context to Redis.
   * @param {string} sessionId - The session ID.
   * @param {object} context - The session context.
   */
  async saveSessionContext(sessionId, context) {
    await this.redis.set(`session:${sessionId}`, JSON.stringify(context), 'EX', 3600); // 1 hour expiry
  }
}

export const chatService = new ChatService();
