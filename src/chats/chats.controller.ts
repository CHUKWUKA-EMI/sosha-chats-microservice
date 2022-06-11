import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { GetChatsInput, SearchChatsInput } from './interfaces/chats.interfaces';

interface TypingPayload {
  friendshipId: number;
  receiverId: string;
  senderFirstName: string;
  senderLastName: string;
}

@Controller()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @MessagePattern({ role: 'chat', cmd: 'create' })
  create(@Payload() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @MessagePattern({ role: 'chat', cmd: 'getChats' })
  findAll(@Payload() input: GetChatsInput) {
    return this.chatsService.findAll(input);
  }

  @MessagePattern({ role: 'chat', cmd: 'searchChats' })
  searchChats(@Payload() input: SearchChatsInput) {
    return this.chatsService.searchChats(input);
  }

  @MessagePattern({ role: 'chat', cmd: 'getChat' })
  findOne(@Payload() id: string) {
    return this.chatsService.findOne(id);
  }

  @MessagePattern({ role: 'chat', cmd: 'updateChat' })
  update(@Payload() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(updateChatDto);
  }

  @MessagePattern({ role: 'chat', cmd: 'deleteChat' })
  remove(@Payload() id: string) {
    return this.chatsService.remove(id);
  }

  @MessagePattern({ role: 'chat', cmd: 'userIsTyping' })
  userIsTyping(@Payload() payload: TypingPayload) {
    return this.chatsService.userIsTyping(
      payload.friendshipId,
      payload.receiverId,
      payload.senderFirstName,
      payload.senderLastName,
    );
  }
}
