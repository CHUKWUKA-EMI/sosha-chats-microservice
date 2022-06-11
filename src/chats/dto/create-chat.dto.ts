import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsUUID()
  receiverId: string;

  @IsNotEmpty()
  @IsUUID()
  senderId: string;

  @IsNotEmpty()
  @IsString()
  senderFirstName: string;

  @IsNotEmpty()
  @IsString()
  senderLastName: string;

  @IsNotEmpty()
  @IsNumber()
  friendshipId: number;

  @IsNotEmpty()
  @IsString()
  receiverFirstName: string;

  @IsNotEmpty()
  @IsString()
  receiverLastName: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
