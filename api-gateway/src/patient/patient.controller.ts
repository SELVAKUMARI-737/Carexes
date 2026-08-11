import { Body, Controller, Post, UseInterceptors,Param,UploadedFile } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { UploadFile } from 'src/common/interfaces/upload-file.interface';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
  ) {}

  @Post('create')
  createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }

  @Post(':patientId/report')
  @UseInterceptors(FileInterceptor('file'))
  uploadReport(
    @Param('patientId') patientId:string,
    @UploadedFile() file: UploadFile,

  ){
    return this.patientService.uploadReport(patientId,file);
  }
}