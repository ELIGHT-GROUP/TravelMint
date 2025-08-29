import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { config } from './utils/config.js';
import { connectToDb } from './utils/db.js';
import { connectToRedis } from './utils/redis.js';
import { configureSocket } from './controllers/socket.controller.js';
import { tripController } from './controllers/trip.controller.js';
import { userController } from './controllers/user.controller.js';
import { toolController } from './controllers/tool.controller.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for now
  },
});

// Middleware
app.use(express.json());

// REST API Routes
app.post('/trip', tripController.saveTrip);
app.get('/trip/:id', tripController.getTrip);
app.get('/user/:id/history', userController.getConversationHistory);
app.post('/tool/:name', toolController.invokeTool);

// Socket.IO Configuration
configureSocket(io);

/**
 * Starts the server.
 */
async function startServer() {
  try {
    await connectToDb();
    connectToRedis();

    server.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

startServer();
