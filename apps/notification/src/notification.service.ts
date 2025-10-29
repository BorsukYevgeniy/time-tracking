import { TIMELOG_CLIENT, TIMELOG_PATTERNS, Timelog } from '@contracts/timelog';
import { USER_CLIENT, USER_PATTERNS, User } from '@contracts/users';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailerService: MailerService,

    @Inject(USER_CLIENT) private readonly userClient: ClientProxy,
    @Inject(TIMELOG_CLIENT) private readonly timelogClient: ClientProxy,
  ) {}

  async sendMorningReminders() {
    const usersToNotify = await this.getUserWhichNeedMorningNotification();

    await Promise.all(
      usersToNotify.map((user) =>
        this.sendMail(
          user.email,
          'Morning Reminder',
          "Don't forget to start your timelog today!",
        ),
      ),
    );
  }

  async sendEveningReminders() {
    const usersToNotify = await this.getUserWhichNeedEveningNotification();

    await Promise.all(
      usersToNotify.map((user) =>
        this.sendMail(
          user.email,
          'Evening Reminder',
          "Don't forget to end your timelog today!",
        ),
      ),
    );
  }

  private async getUserWhichNeedMorningNotification(): Promise<User[]> {
    const users = await firstValueFrom(
      this.userClient.send<User[]>(USER_PATTERNS.FIND_ALL, {}),
    );

    const usersToNotify: User[] = [];

    for (const user of users) {
      const lastTimelog: Timelog | null = await firstValueFrom(
        this.timelogClient.send<Timelog | null>(
          TIMELOG_PATTERNS.GET_LAST_USER_TIMELOG,
          user.id,
        ),
      );

      if (!lastTimelog) {
        usersToNotify.push(user);
        continue;
      }

      if (lastTimelog.start && lastTimelog.end) {
        usersToNotify.push(user);
      }
    }

    return usersToNotify;
  }

  private async getUserWhichNeedEveningNotification(): Promise<User[]> {
    const users = await firstValueFrom(
      this.userClient.send<User[]>(USER_PATTERNS.FIND_ALL, {}),
    );

    const usersToNotify: User[] = [];

    for (const user of users) {
      const lastTimelog: Timelog | null = await firstValueFrom(
        this.timelogClient.send<Timelog | null>(
          TIMELOG_PATTERNS.GET_LAST_USER_TIMELOG,
          user.id,
        ),
      );

      if (lastTimelog.start && !lastTimelog.end) {
        usersToNotify.push(user);
      }
    }

    return usersToNotify;
  }

  private async sendMail(to: string, subject: string, text: string) {
    return await this.mailerService.sendMail({
      to,
      subject,
      text,
    });
  }
}
