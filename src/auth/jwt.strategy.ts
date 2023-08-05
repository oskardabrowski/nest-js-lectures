import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { appConfig } from "../config/app.config";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private UsersRepository: UsersRepository
    ) {

        super({
            secretOrKey: appConfig.jwt_secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });

    }

    async validate(payload: JwtPayload): Promise<User> {
        const {username} = payload;
        const user: User = await this.UsersRepository.findOne({where: {username}})

        if(!user) throw new UnauthorizedException();

        return user;
    }
}