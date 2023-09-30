import {Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { Repository } from 'typeorm';
import { OfferDto } from './dto/offer.dto';
import { InvalidArgumentException } from 'src/exceptions/invalid-argument.exception';
import { NotFoundException } from 'src/exceptions/notfound.exception';

@Injectable()
export class OfferService {
    constructor(
        @InjectRepository(Offer)
        private offerRepository: Repository<Offer>,
    ) {
    }

    public async findAll() {
        return this.offerRepository.find();
    }

    public async findOne(id: number) {
        return this.offerRepository.findOne({
            where: {
                id: id,
            }
        });
    }

    public async create(offerDto: OfferDto): Promise<boolean>{
        if (!offerDto.name || !offerDto.percentage || !offerDto.expirationDate) {
            throw new InvalidArgumentException('Invalid offer parameters');
        }

        const offerEntity = new Offer();
        offerEntity.expirationDate = new Date(offerDto.expirationDate);
        if (isNaN(offerEntity.expirationDate.getTime())) {
            throw new InvalidArgumentException('Invalid expiration date, must be a valid date with format YYYY-MM-DD');
        }

        if (offerEntity.expirationDate < new Date()) {
            throw new InvalidArgumentException('Expiration date should be in the future');
        }

        if (offerDto.percentage < 0 || offerDto.percentage > 100) {
            throw new InvalidArgumentException('Percentage should be between 0 and 100');
        }

        offerEntity.name = offerDto.name;
        offerEntity.percentage = offerDto.percentage;

        try {
            await this.offerRepository.save(offerEntity);
            return true;
        } catch (error) {
            console.error('Failed to save the offer:', error);
            throw error;
        }
    }

    public async update(id: number, offerDto: OfferDto) {
        const offer = await this.offerRepository.findOne({
            where: {id}
        });

        if (!offer) {
            throw new NotFoundException('Offer not found');
        }

        if (offerDto.name) {
            offer.name = offerDto.name;
        }

        if (offerDto.percentage) {
            offer.percentage = offerDto.percentage;
        }

        if (offerDto.expirationDate) {
            offer.expirationDate = new Date(offerDto.expirationDate);
        }

        try {
            const updatedOffer = await this.offerRepository.save(offer);
            return updatedOffer;
        } catch (error) {
            console.error('Failed to update the offer:', error);
            throw error;
        }
    }

    public getOffer(id: number) {
        return this.offerRepository.findOne({where: {id}});
    }
}
