import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    findAll() {
      return this.customerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.customerService.findOne(id);
    }
}

