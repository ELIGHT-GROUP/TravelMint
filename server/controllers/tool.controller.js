import { toolService } from '../services/ToolService.js';

/**
 * Controller for tool-related API endpoints.
 */
export const toolController = {
  /**
   * Invokes a tool.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  async invokeTool(req, res) {
    const { name } = req.params;
    const { args } = req.body;

    try {
      const result = await toolService.callTool(name, args);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: `Error invoking tool: ${name}`, error: error.message });
    }
  },
};
