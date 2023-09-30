import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferDto } from './dto/offer.dto';
import { OfferPatch } from './dto/offer-patch.dto';

@Controller('offer')
export class OfferController {
    constructor(private readonly offerService: OfferService) {}

    @Get()
    public findAll() {
        return this.offerService.findAll();
    }

    @Get(':id')
    public findOne(id: number) {
        return this.offerService.findOne(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    public async create(@Body() offerDto: OfferDto) {
        await this.offerService.create(offerDto)
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    update(@Param('id') id: number, @Body() offerDto: OfferPatch) {
        return this.offerService.update(id, offerDto);
    }
}
