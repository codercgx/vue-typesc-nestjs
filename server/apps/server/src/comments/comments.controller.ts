import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Comment } from '@libs/db/models/comment.model';
import {
  ApiTags,
  ApiProperty,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommentDto } from '../auth/dto/comment.dto';

@Controller('comments')
@ApiTags('评论模块')
export class CommentsController {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: ReturnModelType<typeof Comment>,
  ) {}
  @Get()
  @ApiOperation({ summary: '获取评论' })
  async getComments(@Query('query') query) {
    const params = JSON.parse(query);
    return await this.commentModel
      .find()
      .populate('user')
      .where(params.where)
      .setOptions(params);
  }

  @Post()
  @ApiOperation({ summary: '创建评论' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async createComment(@Body() dto: CommentDto, @CurrentUser() user) {
    dto.user = user._id;
    return await this.commentModel.create(dto);
  }

  @Delete(`delete/:id`)
  async remove(@Param('id') id) {
    await this.commentModel.deleteOne({ _id: id });
  }
}
