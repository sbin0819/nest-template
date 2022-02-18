import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: '모든 유저 불러오기' })
  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':name')
  async findUser(@Param('name') name: string) {
    return this.usersService.findUser(name);
  }

  @Post()
  async createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Patch(':id') async updateUser(
    @Param('id') id: number,
    @Body() user: User,
  ): Promise<string> {
    const res = await this.usersService.updateUser(id, user);
    if (!res) return Object.assign({ error: true, msg: '잘못된 정보입니다.' });
    return Object.assign({
      data: { ...user },
      statusCode: 200,
      statusMsg: `updated successfully`,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(+id);
  }
}
