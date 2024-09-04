/* eslint-disable hexagonal-architecture/enforce */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { CONFIG_DATABASE } from './helpers/config-database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), CONFIG_DATABASE(), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
