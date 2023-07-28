import express from 'express';
const router = express.Router();

import { handleRefreshToken } from '../controllers/refreshTokenController';

router.route('/').get(handleRefreshToken);

export default router;
