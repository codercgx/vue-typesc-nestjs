import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@app/common';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    CommonModule,
    CoursesModule,
    AuthModule,
    ActionsModule,
    CommentsModule,
  ],
  controllers: [AppController, CommentsController],
  providers: [AppService],
})
export class AppModule {}
