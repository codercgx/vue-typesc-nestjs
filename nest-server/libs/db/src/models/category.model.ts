import { prop, Ref } from '@typegoose/typegoose';
export class Category {
  @prop({ ref: 'Category' })
  parent: Ref<Category>;
  @prop()
  name: string;
}
