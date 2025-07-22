import { Type } from "class-transformer";
import { IsEmail, IsString, IsOptional, IsDate } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updateAt?: Date;
}
