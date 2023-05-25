/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity, PrimaryColumn, Generated, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'contacts',
})
export default class Contact {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  additionalData: string;

  @Column({ type: 'varchar', nullable: true })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
