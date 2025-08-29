import { LLMProvider } from './LLMProvider.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../utils/config.js';

/**
 * LLM provider for Google Gemini.
 */
export class GeminiProvider extends LLMProvider {
  constructor() {
    super();
    this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * Generates a response from the Gemini LLM.
   * @param {string} message - The user's message.
   * @param {object} sessionContext - The session context.
   * @param {Array<object>} tools - The available tools.
   * @returns {Promise<object>} The LLM's response.
   */
  async generateResponse(message, sessionContext, tools) {
    const chat = this.model.startChat({
      history: sessionContext.history || [],
      tools: [{ functionDeclarations: tools }],
    });

    const result = await chat.sendMessageStream(message);
    return result.stream;
  }

  /**
   * Returns whether the provider supports streaming.
   * @returns {boolean}
   */
  get supportsStreaming() {
    return true;
  }
}
