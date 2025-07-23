import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { Produk } from './produk/entities/produk.entity';
import { AuthModule } from './auth/auth.module';
import { ProdukModule } from './produk/produk.module';
import jwtConfig from './auth/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      load: [jwtConfig], 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'), 
      database: configService.get('DB_NAME'), 
      entities: [User, Produk], 
      synchronize: true, 
      }),
    }),
    UserModule,
    AuthModule,
    ProdukModule,
  ],
})
export class AppModule {}
