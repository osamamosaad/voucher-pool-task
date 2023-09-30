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
export class VoucherService {
    constructor(
        @InjectRepository(Voucher)
        private voucherRepository: Repository<Voucher>,
        private offerService: OfferService,
        private customerService: CustomerService,
        private voucherQueue: VoucherQueue,
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

    public async create(voucherDto: VoucherDto) {
        const offer = await this.offerService.getOffer(voucherDto.offerId);

        if (!offer) {
            throw new NotFoundException('Offer not found');
        }

        if (offer.expirationDate < new Date()) {
            throw new NotFoundException('Offer expired');
        }

        if (offer.percentage < 0 || offer.percentage > 100) {
            throw new NotFoundException('Percentage should be between 0 and 100');
        }

        // Get One customer
        const customers = await this.customerService.getCustomers(20);
        if (!customers) {
            throw new NotFoundException('Customers not found');
        }

        // iterait all customers and  dispatch a queue
        for (const customer of customers) {
            await this.voucherQueue.store({
                customerId: customer.id,
                offerId: offer.id,
                offerExoirationDate: offer.expirationDate
            });
        }
    }

    public async redeem(voucherCode: string, customerId: number) {

        if (!voucherCode || !customerId) {
            throw new InvalidArgumentException('Invalid voucher parameters');
        }

        const voucher = await this.voucherRepository.findOne({
            where: { voucherCode, customerId }
        });


        if (!voucher) {
            throw new ForbidenException('Access denied');
        }

        if (voucher.isUsed) {
            throw new ForbidenException('Voucher already used');
        }
        if (voucher.expirationDate < new Date()) {
            throw new ForbidenException('Voucher expired');
        }

        voucher.isUsed = true;
        voucher.usedAt = voucher.updatedAt = new Date();
        await this.voucherRepository.save(voucher);
    }
}
