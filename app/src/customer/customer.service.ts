import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { NotFoundException } from 'src/exceptions/notfound.exception';


@Injectable()
export class CustomerService {

    constructor(
      @InjectRepository(Customer)
      private customerRepository: Repository<Customer>,
    ) {
    }

    public findAll() {
      return this.customerRepository.find();
    }

    public async findOne(id: number) {
      let customer = await this.customerRepository.findOne({
        where: {
            id: id,
        }});

      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      return customer;
    }

    public getCustomer(id: number) {
      return this.customerRepository.findOneBy({id});
    }

    public getCustomers(limit: number = null) {
      const options = {};
      if (limit) {
        options['take'] = limit;
      }

      return this.customerRepository.find(options);
    }

  public getCustomersNotAssinedToOffer(offerId: number, limit: number) {

    const queryBuilder = this.customerRepository.createQueryBuilder('c')
      .leftJoin('c.vouchers', 'v', 'v.offerId = :offerId', { offerId })
      .where('v.id IS NULL')
      .select('c')
      .limit(limit);

    return queryBuilder.getMany();
  }
}


