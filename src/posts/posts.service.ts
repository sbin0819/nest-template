import { Injectable } from '@nestjs/common';
import { Post } from './interface/post.interface';

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [];

  createPost(post: Post) {
    // return this.posts.push(post);
    return [{ post: 1 }, { post: 2 }];
  }

  findAll(): Post[] {
    return this.posts;
  }
}
