import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { InjectModel,  } from 'nestjs-typegoose';
import { Category } from '@libs/db/models/category.model';
import { ReturnModelType, } from '@typegoose/typegoose';
import mongoose, { Schema } from 'mongoose'

class CategoryDto {
  parent: Schema.Types.ObjectId;
  name: string;
}

@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  @Get()
  async getCategories() {
    return await this.categoryModel.find();
  }

  @Post()
  async createCategory (@Body() categoryDto) {
    await this.categoryModel.create(categoryDto);
    return {
      data: await this.getCategories(),
      message: '新建分类成功!',
    };
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    await this.categoryModel.deleteOne({ _id: id });
    return {
      message: '删除分类成功!',
    };
  }

  @Put(':id')
  async updateCategory<CategoryDto>(
    @Param('id') id: string,
    @Body() categoryDto: CategoryDto,
  ) {
    return await this.categoryModel.updateOne({ _id: id }, categoryDto);
  }

  @Get(':id')
  async getOneCategory(@Param('id') id:string ){
      return await this.categoryModel.findById(id)
  }
}
