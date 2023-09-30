import { StatusCodes } from 'http-status-codes';
import User from '../models/User';

const getAllUsers = async (req, res) => {
  const user = req.user;
  //console.log(user.user);
  if (!user) res.sendStatus(StatusCodes.UNAUTHORIZED);
  if (!user?.user.user_roles.Admin) res.sendStatus(StatusCodes.FORBIDDEN);
  const allUsers = await User.find({});
  res.status(StatusCodes.OK).json({ users: allUsers });
};

const deleteUser = async (req, res) => {
  const user = req.user;
  //console.log('HI');
  if (!user) res.sendStatus(StatusCodes.UNAUTHORIZED);
  if (!user?.user.user_roles.Admin) res.sendStatus(StatusCodes.FORBIDDEN);
  const { user_id } = req.params;
  //console.log(user, user_id);
  if (!user_id) res.sendStatus(StatusCodes.NOT_FOUND);
  await User.findByIdAndDelete({ _id: user_id });
  res.sendStatus(StatusCodes.OK);
};

// const podcastSubscribe = async (req, res) => {
//     const podId = req.podId;
//     if(!podId) res.sendStatus(StatusCodes.BAD_REQUEST);
//     await User
// }

const userLoggedIn = async (req, res) => {
  // const { refreshToken, accessToken } = req.signedCookies;
  const user = req.user;
  if (!user) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
  res.status(StatusCodes.OK).json({ user });
};

export { getAllUsers, deleteUser, userLoggedIn };
