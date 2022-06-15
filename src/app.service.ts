import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { SeedService } from './seeding/seed.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly seed: SeedService) {}
  async onApplicationBootstrap() {
    if (this.seed) {
      Logger.debug('[Seeding module] has already init');
      this.seed.start().finally(() => {
        Logger.debug('[Seeding] database done');
      });
    } else Logger.debug('[Seeding module] has not init');
  }
  health(name?: string): string {
    return `it works fine! ${name !== undefined ? `Dear ${name}!` : ''}`;
  }
  getUserStatus(userId: string) {
    return 'status';
  }
}
