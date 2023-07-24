import express from 'express';
import {
  deleteUser,
  getAllUsers,
  userLoggedIn,
} from '../controllers/userController';
const router = express.Router();

router.route('/me').get(userLoggedIn);
router.route('/').get(getAllUsers);
router.route('/:user_id').delete(deleteUser);

export default router;
