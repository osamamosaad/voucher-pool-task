import { CreateVoucherService } from './create-voucher.service';
import { VoucherDto } from './dto/voucher.dto';
import { OfferService } from 'src/offer/offer.service';
import { CustomerService } from 'src/customer/customer.service';
import { VoucherQueue } from './queues/voucher.queue';
import { Offer } from 'src/offer/offer.entity';
import { Customer } from 'src/customer/customer.entity';
import { NotFoundException } from 'src/exceptions/notfound.exception';
import { Test, TestingModule } from '@nestjs/testing';

describe('CreateVoucherService', () => {
    let createVoucherService: CreateVoucherService;
    let offerService: OfferService;
    let customerService: CustomerService;
    let voucherQueue: VoucherQueue;

     beforeEach(async() => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                CreateVoucherService,
              {
                provide: OfferService,
                useFactory: () => ({
                    getOffer: jest.fn()
                })
              },
              {
                provide: CustomerService,
                useFactory: () => ({
                    getCustomersNotAssinedToOffer: jest.fn(),
                })
              },
              {
                provide: VoucherQueue,
                useFactory: () => ({
                  store: jest.fn()
                })
              }
            ]
          }).compile();

          createVoucherService = moduleRef.get<CreateVoucherService>(CreateVoucherService);
          offerService = moduleRef.get<OfferService>(OfferService);
          customerService = moduleRef.get<CustomerService>(CustomerService);
          voucherQueue = moduleRef.get<VoucherQueue>(VoucherQueue);
    });

    describe('handle', () => {
        it('should throw NotFoundException if customers are not found', async () => {
            // Arrange
            const voucherDto: VoucherDto = {
                offerId: 14,
                id: 1
            };
            jest.spyOn(customerService, 'getCustomersNotAssinedToOffer').mockResolvedValue([]);

            // Act and Assert
            await expect(
                createVoucherService.handle(voucherDto)
            ).rejects.toThrowError(NotFoundException);
        });

        it('should dispatch vouchers for all customers', async () => {
            // Arrange
            const voucherDto: VoucherDto = {
                id: 1,
                offerId: 20,
            };
            const offer: Offer = {
                id: 20,
                expirationDate: new Date(),
                percentage: 10,
                name: 'some-offer',
                createdAt: new Date(),
                updatedAt: new Date(),
                vouchers: [],
            };
            const customers: Customer[] = [
                {
                    id: 2,
                    name: 'some-customer',
                    email: 'some-email',
                    vouchers: [],
                },
                {
                    id: 3,
                    name: 'some-customer',
                    email: 'some-email',
                    vouchers: [],
                },
                {
                    id: 4,
                    name: 'some-customer',
                    email: 'some-email',
                    vouchers: [],
                },
            ];
            jest.spyOn(offerService, 'getOffer').mockResolvedValue(offer);
            jest.spyOn(customerService, 'getCustomersNotAssinedToOffer').mockResolvedValue(customers);
            jest.spyOn(voucherQueue, 'store').mockResolvedValue(undefined);

            // Act
            await createVoucherService.handle(voucherDto);

            // Assert
            expect(voucherQueue.store).toHaveBeenCalledTimes(customers.length);
            customers.forEach((customer) => {
                expect(voucherQueue.store).toHaveBeenCalledWith({
                    customerId: customer.id,
                    offerId: voucherDto.offerId,
                    offerExoirationDate: expect.any(Date),
                });
            });
        });
    });
});