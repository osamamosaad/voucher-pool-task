import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateOfferTable1695947996339 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'offer',
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
                name: 'percentage',
                type: 'float',
              },
            ],
          }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('offer');
    }

}
