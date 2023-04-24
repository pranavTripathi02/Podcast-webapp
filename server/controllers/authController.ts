import { UserType } from '../types';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import sendVerificationEmail from '../utils/sendVerificationEmail';
import VerificationToken from '../models/VerificationToken';
import AccessToken from '../models/AccessToken';
require('dotenv').config();
import customError from '../error';
import crypto from 'crypto';
import createTokenUser from '../utils/createToken';
import attachCookies from '../utils/attachCookies';

const loginUser = async (req: any, res: any) => {
  const { user_email, user_password } = req.body;
  if (!user_email || !user_password)
    throw new customError.BadRequestError(
      'Please provide both email and password'
    );

  const user = await User.findOne({ user_email });
  if (!user) throw new customError.BadRequestError('User does not exist');

  if (!user.user_isVerified)
    throw new customError.BadRequestError('User not verified');

  const isPassCorrect: boolean = await user.passwordCheck(user_password);
  if (!isPassCorrect)
    throw new customError.UnauthorizedError('Incorrect Password. Try again');

  const tokenUser = createTokenUser(user);

  let refreshToken = '';

  const tokenExists = await AccessToken.findOne({ user: user._id });
  if (tokenExists) {
    const { isValid } = tokenExists;
    if (!isValid)
      throw new customError.UnauthorizedError('Invalid Credentials');
    refreshToken = tokenExists.refreshToken;
    attachCookies({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }
  refreshToken = crypto.randomBytes(12).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;

  const userToken = { refreshToken, ip, userAgent, user: user._id };
  await AccessToken.create(userToken);
  attachCookies({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const registerUser = async (req: any, res: any) => {
  const {
    user_email,
    user_name,
    user_password,
  }: { user_email: string; user_name: string; user_password: string } =
    req.body;
  const emailExists = await User.findOne({ user_email });
  let isAdmin: boolean = false;
  if (emailExists) {
    throw new customError.BadRequestError('User already exists');
  }
  const isFirstUser = (await User.countDocuments()) == 0;
  console.log(isFirstUser);
  if (isFirstUser) {
    if (user_name !== 'admin') {
      //throw err
    }
    isAdmin = true;
  }
  try {
    const user = await User.create({
      user_email,
      user_name,
      user_password,
      user_isAdmin: isAdmin,
    });

    const port = process.env.PORT || 5000;
    const origin = `http://localhost:${port}/api/v1`;

    const verificationToken: string = crypto.randomBytes(25).toString('hex');

    const newToken = await VerificationToken.create({
      user_id: user._id,
      token: verificationToken,
    });

    await sendVerificationEmail({
      user_id: user._id.toString(),
      user_name,
      user_email,
      origin,
      verificationToken,
    });

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

const verifyUser = async (req: any, res: any) => {
  const { user_id, token } = req.params;
  const userExists = await User.findOne({ _id: user_id });
  if (!userExists) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: 'Invalid Link' });
  }
  if (userExists && !userExists.user_isVerified) {
    const tokenExists = await VerificationToken.findOne({ token });
    if (!tokenExists) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: 'Invalid Link' });
    }
    await User.findOneAndUpdate({ _id: user_id }, { user_isVerified: true });
    await VerificationToken.deleteMany({ user_id });
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

const logoutUser = async (req, res) => {
  // console.log(req.user);
  await AccessToken.findOneAndDelete({ user: req.user.user_id });

  res.cookie('accessToken', 'logout', {
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'User logged out!' });
};
export { registerUser, loginUser, verifyUser, logoutUser };
