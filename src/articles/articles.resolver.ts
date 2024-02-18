import { Query, Resolver } from '@nestjs/graphql';
import { Article } from './models/article.model';

@Resolver(() => Article)
export class ArticlesResolver {
  @Query(() => [Article])
  async articles() {
    return [
      {
        id: '1',
        title: 'Article 1',
        author: 'John Doe',
        content: 'This is the content of article 1',
      },
      {
        id: '2',
        title: 'Article 2',
        author: 'Jane Doe',
        content: 'This is the content of article 2',
      },
    ];
  }
}
