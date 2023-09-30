import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Voucher } from './voucher.entity';
import { VoucherDto } from './dto/voucher.dto';
import { NotFoundException } from 'src/exceptions/notfound.exception';
import { EntityManager } from 'typeorm';
import { OfferService } from 'src/offer/offer.service';
import { CustomerService } from 'src/customer/customer.service';
import { InvalidArgumentException } from 'src/exceptions/invalid-argument.exception';
import { ForbidenException } from 'src/exceptions/forbiden.exception';
import { VoucherQueue } from './queues/voucher.queue';

@Injectable()
export class VoucherReadService {
    constructor(
        @InjectRepository(Voucher)
        private voucherRepository: Repository<Voucher>,
    ) {
    }

    public findAll() {
        const query: SelectQueryBuilder<Voucher> = this.voucherRepository
            .createQueryBuilder('voucher')
            .innerJoinAndSelect('voucher.customer', 'customer')
            .innerJoinAndSelect('voucher.offer', 'offer')
            .select([
                'voucher.voucherCode',
                'voucher.isUsed',
                'voucher.expirationDate',
                'customer.email',
                'customer.id',
                'offer.name',
                'offer.percentage',
            ]);

        return query.getMany();
    }
}
