import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name:Patient.name,
          schema: PatientSchema,
        }
      ]),
      MinioModule
  ],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {}
