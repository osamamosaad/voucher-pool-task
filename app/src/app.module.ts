import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { VoucherModule } from './voucher/voucher.module';
import { OfferModule } from './offer/offer.module';


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
    CustomerModule,
    VoucherModule,
    OfferModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
