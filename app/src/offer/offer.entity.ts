import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 255 })
    public name: string;

    @Column()
    public percentage: number;

    @UpdateDateColumn({ name: 'created_at', type: 'timestamp' })
    public createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp' })
    public updatedAt: Date;

    @Column({name: 'expiration_date', type: 'timestamp'})
    public expirationDate: Date
}
