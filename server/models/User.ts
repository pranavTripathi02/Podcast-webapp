import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  user_name: {
    type: String,
    required: [true, 'Please provide a username'],
    validate: isAlpha,
  },
  user_email: {
    type: String,
    unique: true,
    validate: {
      validator: function () {
        isEmail;
      },
      msg: 'Please enter valid email',
    },
    required: [true, 'Please provide an email address'],
  },
  user_password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  user_isAdmin: {
    type: Boolean,
    default: false,
  },
  user_isVerified: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.user_password = await bcrypt.hash(this.user_password, salt);
});

UserSchema.methods.passwordCheck = async function (candidatePassword: string) {
  const isMatch: boolean = await bcrypt.compare(
    candidatePassword,
    this.user_password
  );
  return isMatch;
};

const User = model('User', UserSchema);
export default User;
