import { Module } from '@nestjs/common';
import { ArticlesResolver } from './articles.resolver';
import { ArticlesService } from './articles.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ArticlesResolver, ArticlesService, PrismaService],
})
export class ArticlesModule {}
