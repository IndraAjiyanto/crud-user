import { ConfigType } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(jwtConfig.KEY) private jwtConfiguration: ConfigType<typeof jwtConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: jwtConfiguration.secret!,
    });
  }

  validate(payload: AuthJwtPayload) {
    return { id: payload.sub };
  }
}