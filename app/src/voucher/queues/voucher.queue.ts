import { Injectable } from "@nestjs/common";
import {InjectQueue} from "@nestjs/bull";
import { Queue } from 'bull';

@Injectable()
export class VoucherQueue {
  constructor(@InjectQueue('voucher-pool-quueue') private queue: Queue) {}

  public store(data: any): Promise<any> {
    return this.queue.add('voucher-store-job', data);
  }

  public sendEmail(data: any): Promise<any> {
    return this.queue.add('voucher-email-send-job', data);
  }
}