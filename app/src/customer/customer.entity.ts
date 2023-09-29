import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 60 })
  public name: string;

  @Column({length: 60 })
  public email: string;
}
