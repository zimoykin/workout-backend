import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(name?: string): string {
    return `it works fine! ${name !== undefined ? `Dear ${name}!` : ''}`;
  }
  getUserStatus(userId: string) {
    return 'status';
  }
}
