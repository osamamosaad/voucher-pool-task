import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { Voucher } from './voucher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from 'src/customer/customer.module';
import { OfferModule } from 'src/offer/offer.module';
import { VoucherQueue } from './queues/voucher.queue';
import { BullModule } from '@nestjs/bull';
import { VoucherConsumer } from './queues/voucher.consumer';
@Module({
  imports: [
    BullModule.registerQueue(
      {
          name: 'voucher-pool-quueue',
      }
  ),
    TypeOrmModule.forFeature([Voucher]),
    CustomerModule,
    OfferModule,
  ],
  controllers: [VoucherController],
  providers: [VoucherService, VoucherQueue, VoucherConsumer]
})
export class VoucherModule {
}
