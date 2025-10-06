import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum NotificationType {
  NEW_MESSAGE = 'NEW_MESSAGE',
}

export class NotificationTriggerDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  from: string;
}
