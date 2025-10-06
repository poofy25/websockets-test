# Notification Module Documentation

## Overview

The Notification Module is a NestJS module that provides real-time notification functionality using WebSockets. It allows clients to trigger notification events via REST API and receive them in real-time through WebSocket connections.

## Architecture

The module consists of four main components:

```
NotificationModule
├── NotificationController (REST API)
├── NotificationService (Business Logic)
├── NotificationGateway (WebSocket Handler)
└── NotificationTriggerDto (Data Transfer Object)
```

## Components

### 1. NotificationController

**File:** `notification.controller.ts`

- **Purpose:** Handles HTTP requests for triggering notifications
- **Endpoint:** `POST /trigger-event`
- **Responsibilities:**
  - Receives notification requests via REST API
  - Validates incoming data using DTOs
  - Delegates to NotificationService for processing

**Key Methods:**
- `sendNotification(@Body() notification: NotificationTriggerDto)` - Processes notification requests

### 2. NotificationService

**File:** `notification.service.ts`

- **Purpose:** Contains business logic for notification processing
- **Dependencies:** NotificationGateway (for broadcasting)
- **Responsibilities:**
  - Generates unique IDs for notifications using `randomUUID()`
  - Combines notification data with generated ID
  - Broadcasts notifications via WebSocket gateway
  - Returns success response with payload

**Key Methods:**
- `sendNotification(notification: NotificationTriggerDto)` - Processes and broadcasts notifications

### 3. NotificationGateway

**File:** `notification.gateway.ts`

- **Purpose:** Handles WebSocket connections and real-time communication
- **Dependencies:** Socket.IO server
- **Responsibilities:**
  - Manages WebSocket client connections
  - Logs connection/disconnection events
  - Broadcasts notifications to all connected clients

**Key Methods:**
- `handleConnection(client: Socket)` - Handles new client connections
- `handleDisconnect(client: Socket)` - Handles client disconnections
- `broadcastNotification(notification)` - Broadcasts notifications to all clients

### 4. NotificationTriggerDto

**File:** `dto/notification-trigger.dto.ts`

- **Purpose:** Defines the structure and validation rules for notification data
- **Validation:** Uses class-validator decorators
- **Properties:**
  - `type: NotificationType` - Enum for notification types (currently only NEW_MESSAGE)
  - `message: string` - The notification message content
  - `from: string` - The sender identifier

## Data Flow

1. **Client sends HTTP request** to `POST /trigger-event`
2. **Controller** receives and validates the request using `NotificationTriggerDto`
3. **Service** processes the notification:
   - Generates unique ID using `randomUUID()`
   - Combines original data with generated ID
4. **Gateway** broadcasts the notification to all connected WebSocket clients
5. **Service** returns success response with the complete payload

## WebSocket Events

### Client Connection
- **Event:** `connection`
- **Handler:** `handleConnection()`
- **Action:** Logs client connection with unique ID

### Client Disconnection
- **Event:** `disconnect`
- **Handler:** `handleDisconnect()`
- **Action:** Logs client disconnection

### Notification Broadcast
- **Event:** `new_notification`
- **Triggered by:** Service calling `broadcastNotification()`
- **Payload:** Complete notification object with generated ID

## API Usage

### Triggering a Notification

```bash
curl -X POST http://localhost:8000/trigger-event \
  -H "Content-Type: application/json" \
  -d '{
    "type": "NEW_MESSAGE",
    "message": "Hello from the API!",
    "from": "user123"
  }'
```

### WebSocket Connection

```javascript
const socket = io('ws://localhost:8000');

socket.on('connect', () => {
  console.log('Connected to notification server');
});

socket.on('new_notification', (notification) => {
  console.log('Received notification:', notification);
  // Handle the notification
});
```

## Response Format

### API Response
```json
{
  "success": true,
  "payload": {
    "id": "generated-uuid",
    "type": "NEW_MESSAGE",
    "message": "Hello from the API!",
    "from": "user123"
  }
}
```

### WebSocket Event Payload
```json
{
  "id": "generated-uuid",
  "type": "NEW_MESSAGE",
  "message": "Hello from the API!",
  "from": "user123"
}
```

## Validation Rules

- **type:** Must be a valid `NotificationType` enum value
- **message:** Must be a non-empty string
- **from:** Must be a non-empty string

## Error Handling

- Invalid data will be rejected by validation decorators
- WebSocket connection errors are logged but don't affect the API
- Service always returns success response if validation passes

## Dependencies

- `@nestjs/common` - Core NestJS functionality
- `@nestjs/websockets` - WebSocket support
- `@nestjs/platform-socket.io` - Socket.IO integration
- `class-validator` - Data validation
- `socket.io` - WebSocket communication
- `crypto` - UUID generation
