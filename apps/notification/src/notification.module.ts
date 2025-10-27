import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@shared/config';
import { NotificationService } from './notification.service';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationScheduler } from './notification.scheduler';
import { ClientsModule } from '@nestjs/microservices';
import { USER_CLIENT } from '@contracts/users';
import { TIMELOG_CLIENT } from '@contracts/timelog';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.MAIL_CONFIG,
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: USER_CLIENT,
        useFactory: (configService: ConfigService) => configService.USER_CONFIG,
      },
    ]),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: TIMELOG_CLIENT,
        useFactory: (configService: ConfigService) => configService.TIMELOG_CONFIG,
      },
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [NotificationService, NotificationScheduler],
})
export class NotificationModule {}
