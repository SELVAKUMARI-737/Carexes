import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService,
    ){}

    @GrpcMethod('AuthService', 'Register')
    async register(data: RegisterDto){
        return this.authService.register(data);
    }

    @GrpcMethod('AuthService', 'Login')
    async login(data: LoginDto){
        return this.authService.login(data);
    }
}
