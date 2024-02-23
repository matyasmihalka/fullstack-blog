import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async article(
    articleWhereUniqueInput: Prisma.ArticleWhereUniqueInput,
  ): Promise<Article | null> {
    const article = await this.prisma.article.findUnique({
      where: articleWhereUniqueInput,
    });
    if (!article) {
      throw new NotFoundException(
        `Article with ID ${articleWhereUniqueInput.id} not found`,
      );
    }
    return article;
  }
}
