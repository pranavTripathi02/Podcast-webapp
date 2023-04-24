import { Schema, model } from 'mongoose';
import { AccessTokenType } from '../types';

const accessTokenSchema = new Schema<AccessTokenType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    refreshToken: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      require: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model<AccessTokenType>('AccessToken', accessTokenSchema);
