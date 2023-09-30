import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherDto } from './dto/voucher.dto';
import { VoucherRedeemDto } from './dto/voucher-redeem.dto';

@Controller('voucher')
export class VoucherController {
    constructor(private readonly voucherService: VoucherService) { }
    @Get()
    findAll() {
        return this.voucherService.findAll();
    }

    @Post()
    @UsePipes(ValidationPipe)
    public async create(@Body() voucherDto: VoucherDto) {
        await this.voucherService.create(voucherDto)
    }

    @Post("redeem")
    @UsePipes(ValidationPipe)
    public async redeem(@Body() voucherRedeemDto: VoucherRedeemDto) {
        await this.voucherService.redeem(voucherRedeemDto.voucherCode, voucherRedeemDto.customerId);
    }
}
