import { MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateCustomer1695715150514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
          name: 'customer',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'name',
              type: 'varchar',
              length: '255',
            },
            {
              name: 'email',
              type: 'varchar',
              length: '255',
            },
          ],
        }), true);
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('customer');
      }

}
