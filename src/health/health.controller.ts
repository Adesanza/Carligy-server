import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { ServerHealthIndicator } from './server/server-health-indicator';

@Controller('health')
@ApiTags('App Health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly serverHealth: ServerHealthIndicator,
    private dbHealth: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const healthCheck = await this.health.check([
      async () => this.serverHealth.isHealthy('server'),
      async () => this.dbHealth.pingCheck('db'),
    ]);
    return healthCheck;
  }
}
