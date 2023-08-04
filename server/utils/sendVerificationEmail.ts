import sendEmail from './sendEmail';
import verificationEmail from './verificationEmail';
import VerificationToken from '../models/VerificationToken';
import { UserType } from '../types';
import crypto from 'crypto';

const sendVerificationEmail = async (user: UserType) => {
  const port = process.env.PORT || 5000;
  const origin = `http://localhost:${port}/api/v1`;

  // let verificationToken: string = '';

  const verificationTokenExists = await VerificationToken.findOne({
    user_id: user._id,
  });
  // if (verificationTokenExists) {
  //   verificationToken = verificationTokenExists.token;
  // }
  // else {
  const verificationToken: string =
    verificationTokenExists?.token || crypto.randomBytes(25).toString('hex');
  // }

  await VerificationToken.create({
    user_id: user._id,
    token: verificationToken,
  });

  const url = `${origin}/auth/verify/${user._id.toString()}/${verificationToken}`;
  const message = verificationEmail({ user_name: user.user_name, url });
  //console.log(url, message);
  return sendEmail({
    to: user.user_email,
    subject: 'Account Verification',
    html: `${message}`,
  });
};

export default sendVerificationEmail;
