import { chatService } from '../services/ChatService.js';

/**
 * Configures Socket.IO event handlers.
 * @param {Socket} io - The Socket.IO instance.
 */
export function configureSocket(io) {
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('user_message', async (data) => {
      const { sessionId, message } = data;
      try {
        await chatService.handleUserMessage(sessionId, message, (response) => {
          socket.emit('bot_reply', response);
        });
      } catch (error) {
        console.error('Error handling user message:', error);
        socket.emit('bot_reply', { type: 'error', content: 'An error occurred.' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}
