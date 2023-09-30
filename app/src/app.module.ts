import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { OfferModule } from './offer/offer.module';
import { VoucherModule } from './voucher/voucher.module';
import { BullModule } from '@nestjs/bull';
import { VoucherConsumer } from './voucher/queues/voucher.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    BullModule.forRoot({
      redis: {
        host: `${process.env.REDIS_HOST}`,
        port: parseInt(process.env.REDIS_PORT),
      }
    }),
    CustomerModule,
    VoucherModule,
    OfferModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
