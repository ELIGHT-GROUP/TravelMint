import dotenv from 'dotenv';

dotenv.config();

/**
 * Application configuration from environment variables.
 */
export const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI,
  redisUrl: process.env.REDIS_URL,
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiApiUrl: process.env.GEMINI_API_URL,
  flightApiKey: process.env.FLIGHT_API_KEY,
  hotelApiKey: process.env.HOTEL_API_KEY,
  attractionApiKey: process.env.ATTRACTION_API_KEY,
  carRentalApiKey: process.env.CAR_RENTAL_API_KEY,
};
