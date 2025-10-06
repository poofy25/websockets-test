import { Injectable } from '@nestjs/common';
import { NotificationTriggerDto } from './dto/notification-trigger.dto';
import { NotificationGateway } from './notification.gateway';
import { randomUUID } from 'crypto';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  sendNotification(notification: NotificationTriggerDto) {
    const payload = {
      ...notification,
      id: randomUUID(),
    };
    this.notificationGateway.broadcastNotification(payload);

    return { success: true, payload };
  }
}
