import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type WaitlistUserDocument = WaitlistUser &
  mongoose.Document & { updatedAt: Date; createdAt: Date };

@Schema({ timestamps: true })
export class WaitlistUser {
  @Prop({ lowercase: true, required: true, trim: true, unique: true })
  email: string;
}

export const WaitlistUserSchema = SchemaFactory.createForClass(WaitlistUser);
