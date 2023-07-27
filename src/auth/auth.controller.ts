import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}
    @Post('/signup')
    async signUp(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.AuthService.signUp(AuthCredentialsDto);
    }

    @Post('/signin')
    async signIn(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.AuthService.signIn(AuthCredentialsDto);
    }
}
