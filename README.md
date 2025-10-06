# Interview Project

A NestJS application with WebSocket support for real-time notifications.

## Project setup

### Using Docker (Recommended)

This project includes Docker configuration for easy setup and deployment.

```bash
# Build and run with Docker Compose
$ docker-compose up --build

# Run in detached mode (background)
$ docker-compose up -d --build

# Stop the application
$ docker-compose down
```

### Local Development

```bash
# Install dependencies
$ pnpm install

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## What to Expect

This is a NestJS application with WebSocket support for real-time notifications. The application provides:

### API Endpoints
- **POST** `/trigger-event` - Triggers a notification event
  - **Request Body:**
    ```json
    {
      "type": "NEW_MESSAGE",
      "message": "Your notification message",
      "from": "sender-name"
    }
    ```

### WebSocket Support
- **Connection:** `ws://localhost:8000`
- **Event:** `new_notification` - Receives real-time notifications
- **Format:**
  ```json
  {
    "id": "unique-notification-id",
    "type": "NEW_MESSAGE",
    "message": "Your notification message",
    "from": "sender-name"
  }
  ```

### Testing the Application

1. **Start the application:**
   ```bash
   docker-compose up --build
   ```

2. **Test the API endpoint:**
   ```bash
   curl -X POST http://localhost:8000/trigger-event \
     -H "Content-Type: application/json" \
     -d '{
       "type": "NEW_MESSAGE",
       "message": "Hello from the API!",
       "from": "test-user"
     }'
   ```

3. **Test WebSocket connection:**
   - Connect to `ws://localhost:8000` using a WebSocket client
   - Listen for `new_notification` events
   - Send a POST request to `/trigger-event` to see real-time notifications

The application runs on **port 8000** and includes validation for incoming requests.