import { Length } from 'class-validator';

export class CreatePostDto {
  @Length(5)
  title: string;

  @Length(10)
  description: string;

  thumnail: string;
}
