import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { PatientService } from './patient.service';
import { CreatePatientDto } from 'src/dto/create-patient.dto';

@Controller()
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
  ) {}

  @GrpcMethod('PatientService', 'CreatePatient')
  createPatient(createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @GrpcMethod('PatientService', 'UploadReport')
  uploadReport(data: {
    patientId: string;
    fileName: string;
    mimeType: string;
    file: Uint8Array;
  }) {
    return this.patientService.uploadReport(data);
  }
}