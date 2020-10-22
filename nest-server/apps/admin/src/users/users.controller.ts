import { Controller, Post, Body } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

class LoginDto {
  username: string;
  password: string;
}

class RegisterDto {
  username: string;
  password: string;
  cpassword: string;
}

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('login')
  async userLogin(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user: LoginDto = await this.userModel.findOne({ username });
    if (!user) {
      return {
        status: 1,
        message: '用户名不存在，请重新登录!',
      };
    } else {
      if (user.password != password) {
        return {
          status: 1,
          message: '密码不正确，请重新登录!',
        };
      } else {
        return {
          message: '登录成功!',
          data: await this.userModel.findOne({ username }),
        };
      }
    }
  }

  @Post('register')
  async userRegister(@Body() registerDto: RegisterDto) {
    if (await this.userModel.findOne({ username: registerDto.username })) {
      return {
        status: 1,
        message: '注册失败,用户名重复！',
      };
    } else {
      await this.userModel.create(registerDto);
      return {
        messgae: '"注册成功!请登录"',
        data: await this.userModel.findOne({ username: registerDto.username }),
      };
    }
  }
}
