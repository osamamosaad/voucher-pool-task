import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm"

export class CreateCustomerVoucher1696010353831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "voucher",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'customer_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'offer_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'voucher_code',
                    type: 'varchar',
                    length: '12',
                    isNullable: false,
                },
                {
                    name: 'is_used',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'expiration_date',
                    type: 'timestamp',
                },
                {
                    name: 'used_at',
                    type: 'timestamp',
                    isNullable: true,
                }
            ]
        }), true);

        // Define foreign keys
        await queryRunner.createForeignKey('voucher', new TableForeignKey({
            name: 'voucher_fk_customer_id',
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customer',
        }));

        await queryRunner.createForeignKey('voucher', new TableForeignKey({
            name: 'voucher_fk_offer_id',
            columnNames: ['offer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'offer',
        }));

        // Create an index on the voucher_code column
        await queryRunner.createIndex('voucher', new TableIndex({
            name: 'voucher_ix_voucher_code',
            columnNames: ['voucher_code'],
        }));

        await queryRunner.createIndex('voucher', new TableIndex({
            name: 'voucher_ix_is_used',
            columnNames: ['is_used'],
        }));
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop fks
        await queryRunner.dropForeignKey('voucher', 'voucher_fk_customer_id');
        await queryRunner.dropForeignKey('voucher', 'voucher_fk_offer_id');

        // Drop indexes
        await queryRunner.dropIndex('voucher', 'voucher_ix_voucher_code');
        await queryRunner.dropIndex('voucher', 'voucher_ix_is_used');

        // Drop table
        await queryRunner.dropTable('voucher');
    }

}
