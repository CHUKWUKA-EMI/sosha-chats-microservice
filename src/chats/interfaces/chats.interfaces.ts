/* eslint-disable prettier/prettier */
import { Chat } from '../entities/chat.entity';

/* eslint-disable prettier/prettier */
export interface GetChatsInput {
  friendshipId: number;
  page?: number;
  limit?: number;
}

export interface SearchChatsInput {
  friendshipId: number;
  search: string;
  page?: number;
  limit?: number;
}

export interface Chats {
  data: Chat[];
  currentPage: number;
  size: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface UserIsTyping {
  friendshipId: number;
  receiverId: string;
  notification: string;
}
