import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';


@Module({
  imports:[UserModule,
    JwtModule.register({
      secret: 'carexes-secret',
      signOptions: {
        expiresIn:'1h',
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
