import {isEmail,IsNotEmpty,IsNumber,IsString, IsEmail } from 'class-validator';

export class CreatePatientDto{
    @IsString()
    @IsNotEmpty()
    name!: string;
    
    
    @IsNumber()
    age!: number;

    @IsString()
    gender!: string;

    @IsEmail()
    email!: string;

    @IsString()
    phone!: string;

    @IsString()
    bloodGroup!: string;

    @IsString()
    emergencyContact!: string;

}