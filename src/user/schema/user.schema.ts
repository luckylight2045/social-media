import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Post } from 'src/post/schema/post.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
class FullName {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

@Schema({ _id: false })
class UserList {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  userId: ObjectId[];
}

@Schema({ _id: false })
class Profile {
  @Prop()
  followers: UserList[];

  @Prop()
  followings: UserList[];

  @Prop()
  blockedList: UserList[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  })
  savedPosts: Post[];
}

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  userName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  phoneNumber: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  fullName: FullName;

  @Prop({ required: false })
  profileImg: string;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  })
  posts: Post[];

  @Prop({ required: false })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
