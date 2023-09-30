import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { Voucher } from './voucher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from 'src/customer/customer.module';
import { OfferModule } from 'src/offer/offer.module';
import { BullModule } from '@nestjs/bull';
import { MessengerModule } from 'src/messenger/messenger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voucher]),
    CustomerModule,
    OfferModule,
    MessengerModule,
  ],
  controllers: [VoucherController],
  providers: [VoucherService]
})
export class VoucherModule {
}
