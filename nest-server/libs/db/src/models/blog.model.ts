import { prop } from "@typegoose/typegoose"
export class Blog{
    @prop()
    name: string
    @prop()
    title: string
}