import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Blog } from '@libs/db/models/blog.model';
import { ReturnModelType } from '@typegoose/typegoose';

class CreateDto {
  name: string;
  title: string;
}

@Controller('blogs')
export class BlogsController {
  constructor(
    @InjectModel(Blog) private readonly blogModel: ReturnModelType<typeof Blog>,
  ) {}

  @Get()
  async getBlogs() {
    return await this.blogModel.find();
  }

  @Get('init')
  async initData() {
    await this.blogModel.deleteMany({});
    console.log('数据库初始化成功!');

    return {
      message: '数据初始化成功!',
    };
  }

  @Post()
  async createBlog(@Body() createDto: CreateDto) {
    this.blogModel.create(createDto);
    return {
      data: await this.blogModel.find(),
      message: '创建成功!',
    };
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    console.log(`此操作将删除id为${id}的数据！`);
    await this.blogModel.deleteOne({ _id: id });
  }

  @Get('/:id')
  async getBlogDetail(@Param('id') id: string) {
    console.log(`此操作将获取id为${id}的数据！`);
    return await this.blogModel.findById(id);
  }

  @Put('/:id')
  async updataBlog(@Param('id') id: string, @Body() blogDto: CreateDto) {
    console.log(`此操作将修改id为${id}的数据！`);
    return await this.blogModel.updateOne({ _id: id }, blogDto);
  }
}
