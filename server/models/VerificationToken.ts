import { Schema, model } from 'mongoose';
import { VerificationTokenType } from '../types';

const verificationTokenSchema = new Schema<VerificationTokenType>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 60,
    },
  },
  { timestamps: true }
);

export default model<VerificationTokenType>(
  'VerificationToken',
  verificationTokenSchema
);
