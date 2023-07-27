import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private UsersRepository:UsersRepository,
        private jwtService: JwtService
    ) {}

    async signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.UsersRepository.createUser(AuthCredentialsDto);
    }

    async signIn(AuthCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const {username, password} = AuthCredentialsDto;
        const user = await this.UsersRepository.findOne({where: {username}})

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
