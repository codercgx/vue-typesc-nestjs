import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Blog } from './models/blog.model';
import { Category } from './models/category.model';
import { User } from './models/user.model';

const models = TypegooseModule.forFeature([Blog,Category,User]);
@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/nest-api', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
