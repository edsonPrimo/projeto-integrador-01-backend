/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Entity,
  PrimaryColumn,
  Generated,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export default class Product {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  sku: string;

  @Column({ type: 'varchar', nullable: false })
  value: string;

  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
