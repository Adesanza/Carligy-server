import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Injectable()
export class ServerHealthIndicator extends HealthIndicator {
  constructor() {
    super();
  }
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      return this.getStatus(key, true);
    } catch (err) {
      throw new HealthCheckError('Application check failed', err);
    }
  }
}
