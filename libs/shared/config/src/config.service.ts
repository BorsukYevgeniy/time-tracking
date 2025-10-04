import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get USER_CONFIG(): ClientOptions {
    return {
      options: { port: this.nestConfigService.get<number>('USER_PORT') },
      transport: Transport.TCP,
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

  get API_GATEWAY_CONFIG(): number {
    return this.nestConfigService.get<number>('API_GATEWAY_PORT');
  }
}
