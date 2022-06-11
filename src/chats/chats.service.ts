import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, ChatDocument } from './entities/chat.entity';
import { RpcException } from '@nestjs/microservices';
import {
  Chats,
  GetChatsInput,
  SearchChatsInput,
  UserIsTyping,
} from './interfaces/chats.interfaces';

const logger = new Logger('ChatsService');

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private ChatModel: Model<ChatDocument>) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    try {
      const createdChat = new this.ChatModel(createChatDto);
      return await createdChat.save();
    } catch (error) {
      logger.error(error);
      throw new RpcException(error);
    }
  }

  async findAll({
    page = 1,
    limit = 30,
    friendshipId,
  }: GetChatsInput): Promise<Chats> {
    try {
      const offset = (page - 1) * limit;
      const chats = await this.ChatModel.find({ friendshipId })
        .skip(offset)
        .limit(limit)
        .lean()
        .sort({ createdAt: 1 })
        .exec();
      const totalCount = await this.ChatModel.countDocuments({
        friendshipId,
      }).exec();

      // paginate chats
      const totalPages = Math.ceil(totalCount / limit);
      const hasNext = page < totalPages;
      const hasPrevious = page > 1;

      const chatsData: Chats = {
        data: chats.length > 0 ? chats : [],
        currentPage: page,
        hasNext,
        hasPrevious,
        size: chats.length,
        totalPages,
      };
      return chatsData;
    } catch (error) {
      logger.error(error);
      throw new RpcException(error);
    }
  }

  async searchChats({
    friendshipId,
    search,
    page = 1,
    limit = 30,
  }: SearchChatsInput): Promise<Chats> {
    try {
      const offset = (page - 1) * limit;
      const chats = await this.ChatModel.find(
        { friendshipId, $text: { $search: search } },
        { score: { $meta: 'textScore' } },
      )
        .skip(offset)
        .limit(limit)
        .lean()
        .sort({ score: { $meta: 'textScore' } })
        .exec();
      const totalCount = await this.ChatModel.countDocuments({
        friendshipId,
        $text: { $search: search },
      }).exec();

      // paginate chats
      const totalPages = Math.ceil(totalCount / limit);
      const hasNext = page < totalPages;
      const hasPrevious = page > 1;

      const chatsData: Chats = {
        data: chats.length > 0 ? chats : [],
        currentPage: page,
        hasNext,
        hasPrevious,
        size: chats.length,
        totalPages,
      };
      return chatsData;
    } catch (error) {
      logger.error(error);
      throw new RpcException(error);
    }
  }

  async findOne(id: string): Promise<Chat> {
    try {
      const chat = await this.ChatModel.findById(id).lean().exec();
      if (chat) {
        return chat;
      }

      throw new RpcException('Chat not found');
    } catch (error) {
      logger.error(error);
      throw new RpcException(error);
    }
  }

  async update(updateChatDto: UpdateChatDto): Promise<Chat> {
    try {
      const chat = await this.ChatModel.findByIdAndUpdate(updateChatDto._id, {
        message: updateChatDto.message,
      },{new:true}).exec();
      return chat
    } catch (error) {
      logger.error(error);
      throw new RpcException(error);
    }
  }

  async remove(id: string): Promise<Chat> {
    try {
      const deletedChat = await this.ChatModel.findByIdAndRemove(id,{new:false}).exec();
      return deletedChat;
    } catch (error) {
      logger.error(error);
      throw new RpcException(error);
    }
  }

  async userIsTyping(
    friendshipId: number,
    receiverId: string,
    senderFirstName: string,
    senderLastName: string,
  ): Promise<UserIsTyping> {
    try {
      const payload: UserIsTyping = {
        friendshipId,
        receiverId,
        notification: `${senderFirstName} ${senderLastName} typing...`,
      };

      return payload;
    } catch (error) {
      logger.error(error);
      throw new RpcException(error);
    }
  }
}
