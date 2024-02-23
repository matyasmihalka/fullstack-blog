import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Article } from '@prisma/client';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

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

  async create(createArticleInput: CreateArticleInput) {
    return this.prisma.article.create({
      data: createArticleInput,
    });
  }

  async update(id: string, updateArticleInput: UpdateArticleInput) {
    return this.prisma.article.update({
      where: { id: Number(id) },
      data: { ...updateArticleInput, id: Number(id) },
    });
  }

  async delete(id: string) {
    return this.prisma.article.delete({
      where: { id: Number(id) },
    });
  }

  async findAll(): Promise<Article[]> {
    return this.prisma.article.findMany();
  }
}
