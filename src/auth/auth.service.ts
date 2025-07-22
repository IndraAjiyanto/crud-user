
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string){
    const user = await this.userService.findByEmail(email);
    if(!user) throw new UnauthorizedException("User not found!");
    const isPasswordMatch = await compare(password,user.password);
    if(!isPasswordMatch) 
        throw new UnauthorizedException('Invalid credentials');
    return {id: user.id};
  }

  login(UserId:number){
    const payload: AuthJwtPayload = { sub: UserId };
    return this.jwtService.sign(payload);
  }
}
