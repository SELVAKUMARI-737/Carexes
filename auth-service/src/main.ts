import { NestFactory } from '@nestjs/core';
import {Transport, MicroserviceOptions} from '@nestjs/microservices'
import {join} from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice <MicroserviceOptions>(
  AppModule,
  {
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(__dirname, '../../proto/auth.proto'),
      url: 'localhost:50051',

    },
  }
);
  await app.listen();
  console.log('Auth Service running on gRPC :50051');
}
bootstrap();

