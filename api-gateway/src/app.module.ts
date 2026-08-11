import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [AuthModule, PatientModule],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
