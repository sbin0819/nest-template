import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUser(name: string): Promise<User> {
    const existUser = await this.usersRepository.findOne({ name });
    if (!existUser)
      return Object.assign({
        error: '존재하지 않는 유저입니다.',
      });
    return existUser;
  }

  async createUser(user): Promise<User> {
    if (user.password.length < 4) {
      return Object.assign({
        error: '비밀번호를 다시 입력해주세요',
      });
    }
    const existUser = await this.usersRepository.findOne({ email: user.email });
    if (existUser)
      return Object.assign({
        error: '이미 존재하는 유저입니다.',
      });
    const newUser = await this.usersRepository.save(user);
    return Object.assign({
      data: newUser,
      error: false,
    });
  }

  async updateUser(id: number, user: User): Promise<boolean> {
    const existUser = await this.usersRepository.findOne({ id });
    if (!existUser) return false;
    await this.usersRepository.update(id, user);
    return true;
  }

  async deleteUser(id: number): Promise<any> {
    await this.usersRepository.delete({ id });
  }
}
