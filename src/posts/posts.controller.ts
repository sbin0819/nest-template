import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('POSTS')
@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
    return `This action return a #${id}`;
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `remove a post`;
  }
}
