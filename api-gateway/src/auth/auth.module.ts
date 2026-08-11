import { Module } from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {join} from 'path';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


@Module({
    imports:[
        ClientsModule.register([
            {
                name:'AUTH_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'auth',
                    protoPath: join(process.cwd(), '../proto/auth.proto'),
                    url: 'localhost:50051',
                }
            },
        ]),
    ],
    
    controllers:[AuthController],
    providers:[AuthService],
})
export class AuthModule {}
