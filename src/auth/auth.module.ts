import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  JwtModule.register({
    secret: 'topSecret51',
    signOptions: {
      expiresIn: 3600
    }
  })
  ,TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersRepository],
  controllers: [AuthController]
})
export class AuthModule {}
