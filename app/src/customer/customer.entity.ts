import { Voucher } from "src/voucher/voucher.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 60 })
  public name: string;

  @Column({length: 60 })
  public email: string;

  @OneToMany(() => Voucher, (voucher) => voucher.customer)
  vouchers: Voucher[];
}
