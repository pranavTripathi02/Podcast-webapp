import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
  // userLoggedIn,
  resendVerficationToken,
} from '../controllers/authController';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/verify/re').post(resendVerficationToken);
router.route('/verify/:user_id/:token').get(verifyUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
// router.route('/me').get(userLoggedIn);

export default router;
