import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo(): string {
    return 'IT Support Desk API is running';
  }
}
