import express from 'express';
import {
  loginUser,
  registerUser,
  verifyUser,
} from '../controllers/authController';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/verify/:user_id/:token').get(verifyUser);
router.route('/login').post(loginUser);

export default router;
