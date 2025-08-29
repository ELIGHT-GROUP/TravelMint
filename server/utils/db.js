import { MongoClient } from 'mongodb';
import { config } from './config.js';

let db;

/**
 * Connects to the MongoDB database.
 * @returns {Promise<Db>} The database instance.
 */
export async function connectToDb() {
  if (db) {
    return db;
  }

  try {
    const client = new MongoClient(config.mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
}

/**
 * Returns the database instance.
 * @returns {Db} The database instance.
 */
export function getDb() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}
