import { Injectable,Inject, OnModuleInit} from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface AuthGrpcService{
    Register(data: {
        name: string;
        email: string;
        password: string;
    }): Observable<any>;

    Login(data: {
        email: string;
        password: string;

    }): Observable<any>;

}
@Injectable()
export class AuthService implements OnModuleInit {
    private authService!: AuthGrpcService;
    
    constructor (
        @Inject('AUTH_PACKAGE')
        private readonly client: ClientGrpc,

    ){}

    onModuleInit(){
        this.authService = 
            this.client.getService<AuthGrpcService>('AuthService');

    }
    register(data: {
        name: string;
        email: string;
        password: string;

    }){
        return this.authService.Register(data);

    }

    login(data: {
        email: string;
        password: string;

    }){
        return this.authService.Login(data);
    }
}
