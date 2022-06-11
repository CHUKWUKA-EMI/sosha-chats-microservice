import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AllHttpExceptionsFilter } from 'all-http-exceptions-filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from './chats/chats.module';
import { config} from 'dotenv'

config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      autoIndex: process.env.NODE_ENV !== 'production'?true:false,
    }),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllHttpExceptionsFilter,
    },
  ],
})
export class AppModule {}
