import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AltProductsDescription1684958301837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        length: '400',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'description');
  }
}
