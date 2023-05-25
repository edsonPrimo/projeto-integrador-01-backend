/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity, PrimaryColumn, Generated, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export default class User {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({
    type: 'enum',
    nullable: false,
    default: 'client',
    enum: ['client', 'admin'],
  })
  role: 'client' | 'admin';

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  birthDate: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
