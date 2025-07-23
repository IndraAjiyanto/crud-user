import { Injectable, NotFoundException } from '@nestjs/common';
import { Produk } from './entities/produk.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';

@Injectable()
export class ProdukService {
  constructor(
      @InjectRepository(Produk)
      private readonly produkRepository: Repository<Produk>,
    ) {}

  async create(createProdukDto: CreateProdukDto) {
    const produk = this.produkRepository.create(createProdukDto);
    return await this.produkRepository.save(produk);
  }

  async findByid(id:number){
    return await this.produkRepository.findOne({
      where: {
        id,
      }
    })
  }

  async findAll() {
    return await this.produkRepository.find();
  }

  async findOne(id: number) {
    return await this.produkRepository.findOne({
      where: {
        id,
      }
    });
  }

  async update(id: number, updateProdukDto: UpdateProdukDto) {
    const produk = await this.findByid(id);
      if(!produk){
        throw new NotFoundException();
      }
    Object.assign(produk, updateProdukDto);
    return await this.produkRepository.save(produk);
  }

  async remove(id: number) {
    const produk = await this.findByid(id);
    if(!produk){
      throw new NotFoundException();
    }
    return await this.produkRepository.remove(produk);
  }
}
