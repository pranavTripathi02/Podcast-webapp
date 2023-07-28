import { UserType } from '../types';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import sendVerificationEmail from '../utils/sendVerificationEmail';
import VerificationToken from '../models/VerificationToken';
require('dotenv').config();
import customError from '../error';
import crypto from 'crypto';
import createTokenUser from '../utils/createToken';
import attachCookies from '../utils/attachCookies';
import bcrypt from 'bcryptjs';

const loginUser = async (req: any, res: any) => {
  const { user_email, user_password } = req.body;
  if (!user_email || !user_password)
    throw new customError.BadRequestError(
      'Please provide both email and password'
    );

  const user: UserType = await User.findOne({ user_email });
  if (!user) throw new customError.BadRequestError('User does not exist');

  if (!user?.user_isVerified)
    throw new customError.BadRequestError('User not verified');

  const isPassCorrect = await user.passwordCheck(user_password);
  // console.log(user.user_password, user_password, isPassCorrect);
  if (!isPassCorrect)
    throw new customError.UnauthorizedError('Incorrect Password. Try again');

  // console.log(user);
  const tokenUser = createTokenUser(user);

  const refreshToken = crypto.randomBytes(12).toString('hex');
  // const userAgent = req.headers['user-agent'];
  // const ip = req.ip;

  // const userToken = { refreshToken, ip, userAgent, user: user._id };
  const { accessTokenJWT, refreshTokenJWT } = attachCookies({
    res,
    user: tokenUser,
    refreshToken,
  });
  user.user_refreshToken = refreshTokenJWT;
  console.log(refreshTokenJWT);
  // const accessTokenJWT = res.signedCookies.accessToken;
  // console.log(accessTokenJWT);
  await user.save();

  res.status(StatusCodes.OK).json({ user: tokenUser, accessTokenJWT });
};

const registerUser = async (req: any, res: any) => {
  const {
    user_email,
    user_name,
    user_password,
  }: { user_email: string; user_name: string; user_password: string } =
    req.body;
  const emailExists = await User.findOne({ user_email });
  if (emailExists) {
    sendVerificationEmail(emailExists);
    throw new customError.BadRequestError('User already exists');
  }
  const isFirstUser = (await User.countDocuments()) == 0;
  // console.log(isFirstUser);
  let roles = {};
  if (req.body.roles) {
    roles = req.body.roles;
  }
  if (isFirstUser) {
    // if (user_name !== 'admin') {
    //   //throw err
    // }
    roles = { Admin: 'admin', ...roles };
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user_password, salt);

    const user = await User.create({
      user_email,
      user_name,
      user_password: hashedPass,
      user_roles: roles,
    });

    await sendVerificationEmail(user);

    res.status(StatusCodes.CREATED).json({
      msg: `Thanks for registering ${user.user_name}. Please check your email inbox to verify your account`,
    });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `An error occured. Please try again.` });
  }
};

const resendVerficationToken = async (req, res) => {
  const { user_email } = req.body;
  const userExists = await User.findOne({ user_email });
  if (!userExists || userExists.user_isVerified) {
    throw new customError.BadRequestError('User does not exist.');
  }
  await sendVerificationEmail(userExists);
  res.status(StatusCodes.OK).json({
    msg: `Please check your email inbox to verify your account`,
  });
};

const verifyUser = async (req: any, res: any) => {
  const { user_id, token } = req.params;
  const userExists = await User.findOne({ _id: user_id });
  if (!userExists) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: 'Invalid Link. User does not exist' });
  }
  if (userExists && !userExists.user_isVerified) {
    const tokenExists = await VerificationToken.findOne({ token });
    if (!tokenExists) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: 'Invalid Link. Token may be expired' });
    }
    await User.findOneAndUpdate({ _id: user_id }, { user_isVerified: true });
    await VerificationToken.findOneAndDelete({ user_id });
    res
      .status(StatusCodes.ACCEPTED)
      .json({ msg: 'Congratulations! Your email address has been verified.' });
  }
  if (userExists && userExists.user_isVerified) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'User is already verified' });
  }
};

// const userLoggedIn = async (req, res) => {
//   // const { refreshToken, accessToken } = req.signedCookies;
//   const user = req.user;
//   if (!user) {
//     res.sendStatus(StatusCodes.BAD_REQUEST);
//   }
//   res.status(StatusCodes.OK).json({ user });
// };

const logoutUser = async (req, res) => {
  const { refreshToken } = req.signedCookies;

  res.cookie('accessToken', 'logout', {
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    expires: new Date(Date.now()),
  });

  console.log(refreshToken);

  const foundUser = await User.findOne({ user_refreshToken: refreshToken });
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(StatusCodes.OK);
  }
  await User.findOneAndUpdate(
    { user_refreshToken: refreshToken },
    { user_refreshToken: '' }
  );

  // console.log(res);

  res.status(StatusCodes.OK).json({ msg: 'User logged out!' });
};
export {
  registerUser,
  loginUser,
  resendVerficationToken,
  verifyUser,
  logoutUser,
  // userLoggedIn,
};
