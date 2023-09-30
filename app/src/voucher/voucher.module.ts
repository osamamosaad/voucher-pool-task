import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherReadService } from './voucher-read.service';
import { Voucher } from './voucher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from 'src/customer/customer.module';
import { OfferModule } from 'src/offer/offer.module';
import { VoucherQueue } from './queues/voucher.queue';
import { BullModule } from '@nestjs/bull';
import { VoucherConsumer } from './queues/voucher.consumer';
import { CreateVoucherService } from './create-voucher.service';
import { RedeemVoucherService } from './redeem-voucher.service';
@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'voucher-pool-quueue',
      },
      {
        name: 'voucher-email-send-queue',
      }
    ),
    TypeOrmModule.forFeature([Voucher]),
    CustomerModule,
    OfferModule,
  ],
  controllers: [VoucherController],
  providers: [
    VoucherReadService,
    CreateVoucherService,
    RedeemVoucherService,
    VoucherQueue,
    VoucherConsumer,
  ]
})
export class VoucherModule {
}
