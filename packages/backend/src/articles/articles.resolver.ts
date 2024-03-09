import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Article } from './models/article.model';
import { ArticlesService } from './articles.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gurads/JwtAuthGuard';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private articlesService: ArticlesService) {}

  @Query(() => Article, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async article(@Args('id') id: number): Promise<Article | null> {
    const article = await this.articlesService.article({ id });
    if (article) {
      return article;
    }
    return null;
  }

  @Mutation(() => Article)
  async createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ): Promise<Article> {
    return this.articlesService.create(createArticleInput);
  }

  @Mutation(() => Article)
  async updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ): Promise<Article> {
    return this.articlesService.update(
      updateArticleInput.id,
      updateArticleInput,
    );
  }

  @Mutation(() => Article)
  async deleteArticle(@Args('id') id: string): Promise<Article> {
    return this.articlesService.delete(id);
  }

  @Query(() => [Article])
  async articles(): Promise<Article[]> {
    return this.articlesService.findAll();
  }
}
