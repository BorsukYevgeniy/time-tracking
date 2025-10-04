import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { ClientOptions, Transport } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';

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

  get AUTH_CONFIG(): ClientOptions {
    return {
      options: { port: this.nestConfigService.get<number>('AUTH_PORT') },
      transport: Transport.TCP,
    };
  }

  get REPORT_CONFIG(): ClientOptions {
    return {
      options: { port: this.nestConfigService.get<number>('REPORT_PORT') },
      transport: Transport.TCP,
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
}
