require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(StatusCodes.UNAUTHORIZED);
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(StatusCodes.FORBIDDEN);
    req.user = decoded;
    // //console.log(req.user, decoded);
    next();
  });
};
