import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  senderFirstName: string;

  @Prop({ required: true })
  senderLastName: string;

  @Prop({ required: true })
  receiverId: string;

  @Prop({ required: true })
  receiverFirstName: string;

  @Prop({ required: true })
  receiverLastName: string;

  @Prop({ required: true })
  friendshipId: number;

  @Prop({ required: false })
  message: string;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

const ChatSchema = SchemaFactory.createForClass(Chat);

ChatSchema.index({ friendshipId: 1, message: 'text', createdAt: 1 });

export { ChatSchema };
