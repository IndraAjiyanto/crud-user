import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('produk') // nama tabel di database
export class Produk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column({ type: 'text', nullable: true })
  deskripsi: string;

  @Column({ type: 'int' })
  stok: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
