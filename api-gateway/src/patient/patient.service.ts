import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreatePatientDto } from './dto/create-patient.dto';
import type { UploadFile } from 'src/common/interfaces/upload-file.interface';

interface PatientGrpcService {
  CreatePatient(data: CreatePatientDto): Observable<any>;
  UploadReport(data: {
    patientId: string;
    fileName: string;
    mimeType:string;
    file:Buffer;

  }):Observable<any>
}

@Injectable()
export class PatientService implements OnModuleInit {
  private patientService!: PatientGrpcService;

  constructor(
    @Inject('PATIENT_PACKAGE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.patientService =
      this.client.getService<PatientGrpcService>('PatientService');
  }

  createPatient(data: CreatePatientDto) {
    return this.patientService.CreatePatient(data);
  }

  uploadReport(
    patientId: string,
    file:UploadFile,
  ){
    return this.patientService.UploadReport({
      patientId,
      fileName: file.originalname,
      mimeType: file.mimetype,
      file:file.buffer,
    })
  }
}