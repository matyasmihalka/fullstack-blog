import { Args, Query, Resolver } from '@nestjs/graphql';
import { Article } from './models/article.model';
import { ArticlesService } from './articles.service';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private articlesService: ArticlesService) {}

  @Query(() => Article, { nullable: true })
  async article(@Args('id') id: number): Promise<Article | null> {
    const article = await this.articlesService.article({ id });
    if (article) {
      return {
        ...article,
        id: article.id.toString(), // Convert to string
      };
    }
    return null;
  }

  @Query(() => [Article])
  async articles() {
    return [
      {
        id: '1',
        title: 'Article 1',
        author: 'John Doe',
        content: 'This is the content of article 99',
      },
      {
        id: '2',
        title: 'Article 2',
        author: 'Jane Doe',
        content: 'This is the content of article 55',
      },
    ];
  }
}
