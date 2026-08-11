import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PATIENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'patient',
          protoPath: join(process.cwd(), '../proto/patient.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}