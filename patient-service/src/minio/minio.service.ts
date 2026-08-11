import { Injectable,OnModuleInit,Logger } from '@nestjs/common';
import {Client} from 'minio'

@Injectable()
export class MinioService implements OnModuleInit {
    private readonly logger = new Logger(MinioService.name);
    private minioClient!: Client;
   async onModuleInit(): Promise<void>{
    this.minioClient = new Client({
        endPoint: process.env.MINIO_ENDPOINT!,
        port: Number(process.env.MINIO_PORT),
        useSSL: false,
        accessKey: process.env.MINIO_ACCESS_KEY!,
        secretKey: process.env.MINIO_SECRET_KEY!,
    });
    await this.createBucketIfNotExists();

  }
  private async createBucketIfNotExists(): Promise<void>{
    const bucketName = process.env.MINIO_BUCKET!;
    const bucketExists = await this.minioClient.bucketExists(bucketName);

    if(!bucketExists){
        await this.minioClient.makeBucket(bucketName,'us-east-1');
        this.logger.log(`Bucket "${bucketName}" created successfully`);

    }else{
        this.logger.log(`Bucket "${bucketName}" already exists`);
    }
  }
  async uploadFile(
    objectKey: string,
    file: Buffer,
    mimeType: string,

  ): Promise<string> {
    const bucketName = process.env.MINIO_BUCKET!;

    await this.minioClient.putObject(
    bucketName,
    objectKey,
    file,
    file.length,
    {
        'Content-Type' : mimeType, 
    },
  );
  return objectKey;

}
}
