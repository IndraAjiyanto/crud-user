import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Produk } from '../produk/entities/produk.entity';

export default class ProdukSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Produk);
    await repo.save([
      { nama: 'Produk A', deskripsi: 'A', stok: 10 },
      { nama: 'Produk B', deskripsi: 'B', stok: 20 },
    ]);
  }
}
