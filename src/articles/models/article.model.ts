import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Article {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  content: string;
}
