import { IsNotEmpty, IsDateString, IsNumber, Min, Max, IsString, IsEmpty } from 'class-validator';

export class VoucherDto {
    @IsEmpty()
    public readonly id: number

    @IsNumber()
    @IsNotEmpty()
    public readonly offerId: number

    constructor(data: any) {
        Object.assign(this, data)
    }
}