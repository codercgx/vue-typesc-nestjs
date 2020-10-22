import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ReturnModelType } from '@typegoose/typegoose';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@libs/db/models/user.model';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('actions')
@ApiTags('收藏模块')
export class ActionsController {
  constructor(
    @InjectModel(Action)
    private readonly actionsModel: ReturnModelType<typeof Action>,
  ) {}

  @Get('status')
  @ApiOperation({summary: '获取收藏状态'})
  @UseGuards(AuthGuard('jwt'))
  async getStatus(@Query() dto, @CurrentUser() user) {
    dto.user = user._id;
    const count = await this.actionsModel.countDocuments(dto);
    return {
      status: count > 0,
    };
  }

  @Post('toggle')
  @ApiOperation({summary: '切换收藏状态'})
  @UseGuards(AuthGuard('jwt'))
  async toggle(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    const ret = await this.getStatus(dto, user);
    if (ret.status) {
      await this.actionsModel.deleteMany(dto);
    } else {
      await this.actionsModel.create(dto);
    }
    return await this.getStatus(dto, user);
  }
}
