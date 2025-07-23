import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Response } from 'express';


@Controller('produk')
export class ProdukController {
  constructor(private readonly produkService: ProdukService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProdukDto: CreateProdukDto, @Res() res: Response) {
    await this.produkService.create(createProdukDto);
    const produk = await this.produkService.findAll();
    return res.render('produk/index', { produk });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res: Response) {
    const produk = await this.produkService.findAll();
    return res.render('produk/index', { produk });
  }

  @Get('create')
  async createForm(@Res() res: Response) {
    return res.render('produk/create');
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produkService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProdukDto: UpdateProdukDto) {
    return this.produkService.update(+id, updateProdukDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.produkService.remove(+id);
  }
}
