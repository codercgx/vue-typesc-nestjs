import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { DbModule } from '@libs/db';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BlogsModule, DbModule, CategoriesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
