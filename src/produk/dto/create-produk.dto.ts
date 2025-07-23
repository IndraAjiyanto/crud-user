import { Type } from "class-transformer";
import { IsString, IsOptional, IsDate, IsInt } from "class-validator";

export class CreateProdukDto {
    @IsString()
    nama: string;

    @IsString()
    deskripsi: string;

    @IsInt()
    stok: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updateAt?: Date;
}
