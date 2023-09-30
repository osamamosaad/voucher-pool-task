import { Injectable } from '@nestjs/common';
import { VoucherDto } from './dto/voucher.dto';
import { NotFoundException } from 'src/exceptions/notfound.exception';
import { OfferService } from 'src/offer/offer.service';
import { CustomerService } from 'src/customer/customer.service';
import { VoucherQueue } from './queues/voucher.queue';
import { Offer } from 'src/offer/offer.entity';
import { ForbidenException } from 'src/exceptions/forbiden.exception';

@Injectable()
export class CreateVoucherService {
    constructor(
        private offerService: OfferService,
        private customerService: CustomerService,
        private voucherQueue: VoucherQueue,
    ) {
    }

    public async handle(voucherDto: VoucherDto) {
        const offer = await this.offerService.getOffer(voucherDto.offerId);

        this.validate(offer);

        const customers = await this.customerService.getCustomers(20);
        if (!customers) {
            throw new NotFoundException('Customers not found');
        }

        // iterait all customers and dispatch a queue
        for (const customer of customers) {
            await this.voucherQueue.store({
                customerId: customer.id,
                offerId: offer.id,
                offerExoirationDate: offer.expirationDate
            });
        }
    }

    private validate(offer: Offer) {
        if (!offer) {
            throw new NotFoundException('Offer not found');
        }

        if (offer.expirationDate < new Date()) {
            throw new ForbidenException('Voucher expired');
        }
    }
}
