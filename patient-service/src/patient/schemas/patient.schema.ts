import {Prop,Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true})
export class Patient{
      @Prop({ required: true })
        name !: string;

        @Prop({ required: true })
        age! : number;

        @Prop({ required: true })
        gender! : string;

        @Prop({ required: true, unique: true })
        email! : string;

        @Prop({ required: true })
        phone! : string;

        @Prop({ required: true })
        bloodGroup! : string;

        @Prop({ required: true })
        emergencyContact! : string;

        @Prop({ default: true })
        isActive! : boolean;

        @Prop({
          type: [String],
          default:[],
                  })
        reports!: string[];
}
export const PatientSchema = SchemaFactory.createForClass(Patient);
