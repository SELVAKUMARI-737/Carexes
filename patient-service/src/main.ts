import { NestFactory } from '@nestjs/core';
import {Transport, MicroserviceOptions} from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'patient',
        protoPath: join(process.cwd(),'../proto/patient.proto'),
        url:'localhost:50052',
      },

    },
  );
  await app.listen();
  console.log('patient service running on gRPC : 50052');
}
bootstrap();
