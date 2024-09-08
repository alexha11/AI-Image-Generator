import express from 'express';
import * as dotenv from 'dotenv';

const router = express.Router();

dotenv.config();

router.route('/').get((req, res) => {
  res.send('hi');
}
);

export default router;