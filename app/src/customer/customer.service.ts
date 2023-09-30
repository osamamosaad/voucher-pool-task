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
}


