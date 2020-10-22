import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { Course } from './course.model';
import { Episode } from './episode.model';
import { ApiProperty } from '@nestjs/swagger';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Comment {
  @ApiProperty({ description: '用户id' })
  @prop({ ref: 'User' })
  user: Ref<User>;
  @ApiProperty({ description: '类型' })
  @prop({ enum: ['Course', 'Episode'] })
  type: string;
  @ApiProperty({ description: '对象id' })
  @prop({ refPath: 'type' })
  object: Ref<Course | Episode>;
  @ApiProperty({ description: '内容' })
  @prop()
  comment: string;
}
