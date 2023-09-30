import { IsNotEmpty, IsDateString, IsNumber, Min, Max, IsString, IsEmpty, IsOptional } from 'class-validator';

export class OfferPatch {
    @IsEmpty()
    public readonly id: number

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly name: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(100)
    public readonly percentage: number

    @IsOptional()
    @IsDateString()
    public readonly expirationDate: Date
    @IsEmpty()
    public readonly createdAt: Date
    @IsEmpty()
    public readonly updatedAt: Date

    constructor(data: any) {
        Object.assign(this, data)
    }
}