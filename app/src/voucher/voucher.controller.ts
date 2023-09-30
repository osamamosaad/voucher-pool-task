import { Body, Controller, Get, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { VoucherReadService} from './voucher-read.service';
import { VoucherDto } from './dto/voucher.dto';
import { VoucherRedeemDto } from './dto/voucher-redeem.dto';
import { CreateVoucherService } from './create-voucher.service';
import { RedeemVoucherService } from './redeem-voucher.service';

@Controller('voucher')
export class VoucherController {
    constructor(
        private readonly voucherService: VoucherReadService,
        private readonly createVoucherService: CreateVoucherService,
        private readonly redeemVoucherService: RedeemVoucherService,
    ) { }

    @Get()
    findAll() {
        return this.voucherService.findAll();
    }

    @Post()
    @UsePipes(ValidationPipe)
    public async create(
        @Body() voucherDto: VoucherDto
    ) {
        await this.createVoucherService.handle(voucherDto)
    }

    @Post("redeem")
    @UsePipes(ValidationPipe)
    public async redeem(@Body() voucherRedeemDto: VoucherRedeemDto) {
        await this.redeemVoucherService.handle(voucherRedeemDto.voucherCode, voucherRedeemDto.customerId);
    }
}
