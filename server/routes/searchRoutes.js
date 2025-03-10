import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';

import logger from '../utils/logger.js';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('hi');
});

router.route('/').post(async (req, res) => {
  const { prompt } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const options = {
    method: 'GET',
    url: 'https://image-search19.p.rapidapi.com/v2/',
    params: {
      q: prompt,
      hl: 'en'
    },
    headers: {
      'x-rapidapi-key': process.env.SEARCH_API_KEY,
      'x-rapidapi-host': 'image-search19.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    logger.info(response.data);
    res.status(200).json(response.data); // Send data back to client
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;
