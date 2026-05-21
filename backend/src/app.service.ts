import { Injectable } from '@nestjs/common';

export interface HealthResponse {
  status: 'ok';
  service: string;
  timestamp: string;
}

@Injectable()
export class AppService {
  getApiInfo(): string {
    return 'IT Support Desk API is running';
  }

  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'it-support-desk-api',
      timestamp: new Date().toISOString(),
    };
  }
}
