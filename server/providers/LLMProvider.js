/**
 * Interface for LLM providers.
 */
export class LLMProvider {
  /**
   * Generates a response from the LLM.
   * @param {string} message - The user's message.
   * @param {object} sessionContext - The session context.
   * @param {Array<object>} tools - The available tools.
   * @returns {Promise<object>} The LLM's response.
   */
  async generateResponse(message, sessionContext, tools) {
    throw new Error('Not implemented');
  }

  /**
   * Returns whether the provider supports streaming.
   * @returns {boolean}
   */
  get supportsStreaming() {
    throw new Error('Not implemented');
  }
}
