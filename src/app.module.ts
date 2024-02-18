import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [GraphqlModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
