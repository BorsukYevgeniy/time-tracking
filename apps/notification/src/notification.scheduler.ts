import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationService } from './notification.service';

@Injectable()
export class NotificationScheduler {
  constructor(private readonly notificationService: NotificationService) {}

  @Cron('0 0 8 * * *')
  async sendMorningReminder() {
    return await this.notificationService.sendMorningReminders();
  }

  @Cron('0 0 17 * * *')
  async sendEveningReminder() {
    return await this.notificationService.sendEveningReminders();
  }
}
