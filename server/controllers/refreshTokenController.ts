import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.signedCookies;
  if (!cookies?.accessToken) return res.sendStatus(StatusCodes.UNAUTHORIZED);
  const { refreshToken } = cookies;

  console.log('cookies');
  console.log(refreshToken);
  console.log(cookies);
  const foundUser = await User.findOne({ user_refreshToken: refreshToken });
  console.log('foundUser', foundUser);
  if (!foundUser) return res.sendStatus(StatusCodes.FORBIDDEN);

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || foundUser.user_email !== decoded.user.user_email)
      return res.sendStatus(StatusCodes.FORBIDDEN);

    console.log('decoded', decoded);
    const accessToken = jwt.sign(
      { user: decoded.user },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return res.status(StatusCodes.OK).json({ accessToken });
  });
};

export { handleRefreshToken };
