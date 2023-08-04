import express from 'express';
import { getAllPodcasts } from '../controllers/podcastController';
const router = express.Router();

router.route('/').get(getAllPodcasts);

export default router;
