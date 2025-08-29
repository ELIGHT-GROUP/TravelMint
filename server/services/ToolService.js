import fs from 'fs/promises';
import path from 'path';
import { flightProvider } from '../providers/FlightProvider.js';
import { hotelProvider } from '../providers/HotelProvider.js';
import { attractionProvider } from '../providers/AttractionProvider.js';
import { carRentalProvider } from '../providers/CarRentalProvider.js';

class ToolService {
  constructor() {
    this.tools = [];
    this.toolMap = new Map();
    this.loadTools();
  }

  /**
   * Loads tool definitions from tools.json.
   */
  async loadTools() {
    const toolsPath = path.resolve(process.cwd(), 'tools.json');
    const toolsFile = await fs.readFile(toolsPath, 'utf-8');
    this.tools = JSON.parse(toolsFile);

    this.toolMap.set('searchFlights', flightProvider.searchFlights.bind(flightProvider));
    this.toolMap.set('searchHotels', hotelProvider.searchHotels.bind(hotelProvider));
    this.toolMap.set('getAttractions', attractionProvider.getAttractions.bind(attractionProvider));
    this.toolMap.set('searchCarRentals', carRentalProvider.searchCarRentals.bind(carRentalProvider));
    // The planDayItinerary tool is special and will be handled by the ChatService
  }

  /**
   * Gets the list of available tools.
   * @returns {Array<object>} The list of tools.
   */
  getTools() {
    return this.tools;
  }

  /**
   * Calls a tool by name.
   * @param {string} toolName - The name of the tool to call.
   * @param {object} args - The arguments for the tool.
   * @returns {Promise<object>} The result of the tool call.
   */
  async callTool(toolName, args) {
    if (!this.toolMap.has(toolName)) {
      throw new Error(`Tool not found: ${toolName}`);
    }

    const tool = this.toolMap.get(toolName);
    return await tool(args);
  }
}

export const toolService = new ToolService();
