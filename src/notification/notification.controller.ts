import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationTriggerDto } from './dto/notification-trigger.dto';

@Controller('')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('trigger-event')
  sendNotification(@Body() notification: NotificationTriggerDto) {
    return this.notificationService.sendNotification(notification);
  }
}
