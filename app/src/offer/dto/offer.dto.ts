import { IsNotEmpty, IsDateString, IsNumber, Min, Max, IsString, IsEmpty } from 'class-validator';

export class OfferDto {
    @IsEmpty()
    public readonly id: number

    @IsString()
    @IsNotEmpty()
    public readonly name: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(100)
    public readonly percentage: number

    @IsDateString()
    public readonly expirationDate: Date
    public readonly createdAt: Date
    public readonly updatedAt: Date

    constructor(data: any) {
        Object.assign(this, data)
    }
}