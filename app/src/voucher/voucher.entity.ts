import { Customer } from "src/customer/customer.entity";
import { Offer } from "src/offer/offer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Voucher {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'offer_id', type: 'int'})
    public offerId: number;

    @Column({name: 'customer_id', type: 'int'})
    public customerId: number;

    @Column({name: 'voucher_code', type: 'varchar', length: '12', unique: true})
    public voucherCode: string;

    @Column({name: 'is_used', type: 'boolean', default: false})
    public isUsed: boolean;

    @Column({name: 'used_at', type: 'timestamp', nullable: true})
    public usedAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    public createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp' })
    public updatedAt: Date;

    @Column({name: 'expiration_date', type: 'timestamp'})
    public expirationDate: Date

    @ManyToOne(() => Customer, (customer) => customer.vouchers)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => Offer, (offer) => offer.vouchers)
    @JoinColumn({ name: 'offer_id' })
    offer: Offer;
}
