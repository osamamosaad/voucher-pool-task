import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ProducerService {
  constructor(@InjectQueue('voucher-pool-quueue') private queue: Queue) {}

  public add(processName: string, data: any): Promise<any> {
    return this.queue.add(processName, data);
  }
}