import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, SECRET);
  return token;
};

const isTokenValid = (token: string) => jwt.verify(token, SECRET);

export { createJWT, isTokenValid };
