import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true })
class Comment {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  userId: ObjectId;

  @Prop({ required: true })
  body: string;

  @Prop({ default: false })
  isEdited: boolean;
}

@Schema({ timestamps: true })
export class Post {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  ownerId: ObjectId;

  @Prop()
  caption: string;

  @Prop({
    default: false,
  })
  isEdited: boolean;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  likes: ObjectId[];

  @Prop()
  comments: Comment[];
}
