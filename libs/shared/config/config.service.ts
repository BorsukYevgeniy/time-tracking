import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { ClientOptions, Transport } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';
import { MailerOptions } from '@nestjs-modules/mailer';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get USER_CONFIG(): ClientOptions {
    return {
      options: { port: this.nestConfigService.get<number>('USER_PORT') },
      transport: Transport.TCP,
    };
  }

  get USER_DB_CONFIG(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.nestConfigService.get<string>('USER_DB_HOST'),
      port: this.nestConfigService.get<number>('USER_DB_PORT'),
      username: this.nestConfigService.get<string>('USER_DB_USERNAME'),
      password: this.nestConfigService.get<string>('USER_DB_PASSWORD'),
      database: this.nestConfigService.get<string>('USER_DB_NAME'),
    };
  }

  get TIMELOG_CONFIG(): ClientOptions {
    return {
      options: { port: this.nestConfigService.get<number>('TIMELOG_PORT') },
      transport: Transport.TCP,
    };
  }

  get TIMELOG_DB_CONFIG(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.nestConfigService.get<string>('TIMELOG_DB_HOST'),
      port: this.nestConfigService.get<number>('TIMELOG_DB_PORT'),
      username: this.nestConfigService.get<string>('TIMELOG_DB_USERNAME'),
      password: this.nestConfigService.get<string>('TIMELOG_DB_PASSWORD'),
      database: this.nestConfigService.get<string>('TIMELOG_DB_NAME'),
    };
  }

  get API_GATEWAY_CONFIG(): number {
    return this.nestConfigService.get<number>('API_GATEWAY_PORT');
  }

  get JWT_CONFIG(): JwtModuleOptions {
    return {
      secret: this.nestConfigService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: this.nestConfigService.get<string>('JWT_EXPIRATION_TIME'),
      },
    };
  }

  get NOTIFICATION_CONFIG(): ClientOptions {
    return {
      options: { port: this.nestConfigService.get<number>('MAILER_PORT') },
      transport: Transport.TCP,
    };
  }

  get MAIL_CONFIG(): MailerOptions {
    return {
      transport: {
        host: this.nestConfigService.get<string>('SMTP_HOST'),
        port: this.nestConfigService.get<number>('SMTP_PORT'),
        auth: {
          user: this.nestConfigService.get<string>('SMTP_USER'),
          pass: this.nestConfigService.get<string>('SMTP_PASSWORD'),
        },
      },
      defaults: {
        from: this.nestConfigService.get<string>('SMTP_USER'),
      },
    };
  }
}
