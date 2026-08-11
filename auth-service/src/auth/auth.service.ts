import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}

    async register(registerDto: RegisterDto){
        const existingUser = await this.userService.findByEmail(registerDto.email);

        if (existingUser){
            throw new ConflictException("Email already exists");

        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user = await this.userService.create({
            ...registerDto,
            password: hashedPassword,
        });

        return {
            message: 'User registered successfully',
            
        }

    }
    async login(loginDto: LoginDto){
        const user = await this.userService.findByEmail(loginDto.email);

        if(!user){
            throw new UnauthorizedException("Invalid Credentials");
        }

        const isMatch = await bcrypt.compare(
            loginDto.password,
            user.password,
        );

        if(!isMatch){
            throw new UnauthorizedException("Invalid Credentials");
        }

        const accessToken = this.jwtService.sign({
            sub: user._id,
            email: user.email,
        });
        return {
            
            accessToken,
        }
    }
}
