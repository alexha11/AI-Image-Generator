import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.send('hi');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' }); 
    }

    const aiResponse = await openai.images.generate({
      model: 'dall-e-2',
      prompt: prompt,
      n: 1,
      size: '256x256',
      response_format: 'b64_json',
    });
    console.log(aiResponse);
    const image = aiResponse.data[0].b64_json;
    res.status(200).json({
      photo: image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

export default router;
