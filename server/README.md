# TCD - AI Trip Planner Backend

This is the backend for the TCD AI Trip Planner application. It is built with Node.js, Express, Socket.IO, MongoDB, and Redis, and uses Gemini 1.5 Flash for its AI capabilities.

## Features

- Real-time chat with an AI assistant via Socket.IO
- Streaming LLM responses
- Tool system for interacting with external APIs
- REST API for managing trips and users
- Decoupled and extensible architecture based on SOLID principles

## Getting Started

### Prerequisites

- Node.js (v20+)
- MongoDB
- Redis

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd tcd-server
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file by copying the `env.example` file:
   ```sh
   cp env.example .env
   ```
5. Open the `.env` file and replace the placeholder values with your actual API keys and configuration.

### Running the Server

To start the server, run:

```sh
npm start
```

For development with automatic reloading, you can use:

```sh
npm run dev
```

The server will start on the port specified in your `.env` file (default is 3000).

## Architecture

The backend is designed to be modular and extensible, following clean architecture and SOLID principles.

- `/controllers`: Handles incoming requests (REST and Socket.IO) and calls the appropriate services.
- `/services`: Contains the core business logic of the application.
- `/providers`: Implements interfaces for external services like LLMs and APIs.
- `/models`: Defines the database schemas for MongoDB.
- `/utils`: Contains utility functions for configuration, database connections, etc.

## Extending the System

### Adding a New Tool

1. Add a new tool definition to the `tools.json` file.
2. Create a new provider in the `/providers` directory to handle the tool's logic.
3. Update the `ToolService` in `/services/ToolService.js` to map the new tool to its provider.

### Adding a New LLM

1. Create a new LLM provider in the `/providers` directory that implements the `LLMProvider` interface.
2. Update the `ChatService` in `/services/ChatService.js` to use the new LLM provider.

### Switching API Providers

To switch to a different API provider (e.g., for flights or hotels), you only need to update the corresponding provider file in the `/providers` directory. As long as it adheres to the expected interface, the rest of the application will work without any changes.
