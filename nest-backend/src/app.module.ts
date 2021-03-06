import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CharacterModule } from './character/character.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character/character.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://GAMEADMIN:Ikdx9139@cluster0.ty5ph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Character
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }), CharacterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
