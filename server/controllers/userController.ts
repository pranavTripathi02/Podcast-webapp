import { UserType } from '../types';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';

const loginUser = async (req: any, res: any) => {};

const registerUser = async (req: any, res: any) => {
  const { user_email, user_name, user_password } = req.body;
  const emailExists = await User.findOne({ user_email });
  let isAdmin = false;
  if (emailExists) {
    //throw err
  }
  const isFirstUser = (await User.countDocuments()) == 0;
  if (isFirstUser) {
    if (user_name !== 'admin') {
      //throw err
    }
    isAdmin = true;
  }
  const user = await User.create({
    user_email,
    user_name,
    user_password,
    user_isAdmin: isAdmin,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: `Thanks for registering ${user.user_name}` });
};

export { registerUser, loginUser };
