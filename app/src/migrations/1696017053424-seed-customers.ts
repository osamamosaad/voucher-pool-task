import { MigrationInterface, QueryRunner, Repository } from "typeorm"
import * as faker from 'faker';



export class SeedCustomers1696017053424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // convert tests to snick case

        const numberOfCustomers = 10000;
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('customer') // Replace 'user' with your table name
            .values(Array.from({ length: numberOfCustomers }, (_, i) => ({
                name: faker.name.findName(),
                email: `user_${i + 1}_${faker.internet.email()}`,
            }))
            )
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
