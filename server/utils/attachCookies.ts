import jwt from 'jsonwebtoken';
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const attachCookies = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  // console.log(accessTokenJWT);
  const refreshTokenJWT = createJWT({ payload: { user } });
  const day = 1000 * 60 * 60 * 24;

  res
    .cookie('accessToken', accessTokenJWT, {
      httpOnly: true,
      signed: true,
      expires: new Date(Date.now() + day),
    })
    .cookie('refreshToken', refreshTokenJWT, {
      httpOnly: true,
      signed: true,
      expires: new Date(Date.now() + day * 30),
    });
  return { accessTokenJWT, refreshTokenJWT };
};

export default attachCookies;
