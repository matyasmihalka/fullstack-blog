import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateArticleInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  author: string;
}
