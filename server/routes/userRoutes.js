import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import * as dotenv from 'dotenv';
import User from '../mongodb/models/user.js';

const router = express.Router();

dotenv.config();

router.route('/').get(async (req, res) => {
  const users = await User.find({}).populate('posts', { name: 1, prompt: 1, photo: 1, love: 1 });
  res.status(200).json({ success: true, data: users });
});

router.route('/').post(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.route('/login').post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne ({ email });
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password);
    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: 'invalid email or password' });
    }
    const userForToken = {
      email: user.email,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).send({ token, email: user.email, username: user.username });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;