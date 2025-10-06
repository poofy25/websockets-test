import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NotificationTriggerDto } from './dto/notification-trigger.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
  }

  broadcastNotification(notification: NotificationTriggerDto & { id: string }) {
    console.log('Broadcasting notification', notification);
    this.server.emit('new_notification', notification);
  }
}
