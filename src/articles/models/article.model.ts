import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Article {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  content: string;
}
