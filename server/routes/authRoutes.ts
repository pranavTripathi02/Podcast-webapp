import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from '../controllers/authController';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/verify/:user_id/:token').get(verifyUser);
router.route('/login').post(loginUser);
router.route('/logout').delete(logoutUser);

export default router;
