import { ApiProduces, ApiProperty } from '@nestjs/swagger';
import { Ref } from '@typegoose/typegoose';
import { User } from '@libs/db/models/user.model';
import { Course } from '@libs/db/models/course.model';
import { Episode } from '@libs/db/models/episode.model';

export class CommentDto {
  //   @ApiProperty({ description: '用户id' })
  //   user: string;

  //   @ApiProperty({ description: '评论分类'})
  //   type: string;

  //   @ApiProperty({ description: '对象id' })
  //   object: string;

  //   @ApiProperty({ description: '评论内容' })
  //   comment: string;
  //
  @ApiProperty({ description: '用户id' })
  user: Ref<User>;
  @ApiProperty({ description: '类型' })
  type: string;
  @ApiProperty({ description: '对象id' })
  object: Ref<Course | Episode>;
  @ApiProperty({ description: '内容' })
  comment: string;
}
