import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VoucherRedeemDto {
    @IsString()
    @IsNotEmpty()
    public readonly voucherCode: string

    @IsNumber()
    @IsNotEmpty()
    public readonly customerId: number

    constructor(data: any) {
        Object.assign(this, data)
    }
}