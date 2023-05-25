import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Contact1685044916730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contacts',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '40',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '40',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '1000',
          },
          {
            name: 'additionalData',
            type: 'varchar',
            length: '1000',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contacts');
  }
}
