import { Injectable } from '@nestjs/common';
import { ForbidenException } from 'src/exceptions/forbiden.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from './voucher.entity';
import { Repository } from 'typeorm';
import { InvalidArgumentException } from 'src/exceptions/invalid-argument.exception';

@Injectable()
export class RedeemVoucherService {
    constructor(
        @InjectRepository(Voucher)
        private voucherRepository: Repository<Voucher>,
    ) {
    }

    public async handle(voucherCode: string, customerId: number) {

        if (!voucherCode || !customerId) {
            throw new InvalidArgumentException('Invalid voucher parameters');
        }

        const voucher = await this.voucherRepository.findOne({
            where: { voucherCode, customerId }
        });


        this.validate(voucher);

        voucher.isUsed = true;
        voucher.usedAt = voucher.updatedAt = new Date();
        await this.voucherRepository.save(voucher);
    }

    private validate(voucher: Voucher) {
        if (!voucher) {
            throw new ForbidenException('Access denied');
        }

        if (voucher.isUsed) {
            throw new ForbidenException('Voucher already used');
        }
        if (voucher.expirationDate < new Date()) {
            throw new ForbidenException('Voucher expired');
        }
    }
}
