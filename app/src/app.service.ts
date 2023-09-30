import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';

@Injectable()
export class AppService {
  getHello(): string {
    dotenvConfig({ path: '.env' });
    
    return 'Hello World!';
  }
}
