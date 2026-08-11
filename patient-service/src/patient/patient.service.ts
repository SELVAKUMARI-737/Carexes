import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Patient } from './schemas/patient.schema';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { MinioService } from 'src/minio/minio.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<Patient>,

    private readonly minioService: MinioService,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    await this.patientModel.create(createPatientDto);

    return {
      message: 'Patient created successfully',
    };
  }

  async uploadReport(data: {
    patientId: string;
    fileName: string;
    mimeType: string;
    file: Uint8Array;
  }) {
    // Convert gRPC bytes into Node.js Buffer
    const buffer = Buffer.from(data.file);

    // Create patient-specific MinIO path
    const objectKey = `patients/${data.patientId}/reports/${data.fileName}`;

    // Upload file to MinIO
    const uploadedFile = await this.minioService.uploadFile(
      objectKey,
      buffer,
      data.mimeType,
    );

    // Save MinIO object key in MongoDB
    await this.patientModel.findByIdAndUpdate(
      data.patientId,
      {
        $push: {
          reports: uploadedFile,
        },
      },
      {
        new: true,
      },
    );

    return {
      message: 'Report uploaded successfully',
      fileName: uploadedFile,
    };
  }
}