import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import * as dotenv from 'dotenv';

import User from '../mongodb/models/user.js';
import logger from '../utils/logger.js';

const router = express.Router();

dotenv.config();

router.route('/').get(async (req, res) => {
  const users = await User.find({})
    .populate('lovedPosts', { name: 1, prompt: 1, photo: 1, love: 1 })
    .populate('createdPosts', { name: 1, prompt: 1, photo: 1, love: 1 });

  res.status(200).json({ success: true, data: users });
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate('lovedPosts', { name: 1, prompt: 1, photo: 1, love: 1 })
    .populate('createdPosts', { name: 1, prompt: 1, photo: 1, love: 1 });

  res.status(200).json({ success: true, data: user });
});

router.route('/register').post(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Username, email, and password are required' });
    }

    if (await User.findOne({
      $or: [
        { username },
        { email },
      ],
    })) {
      return res.status(400).json({ success: false, message: 'Username or email already exists' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    if (email.length > 50) {
      return res.status(400).json({ success: false, message: 'Email must be at most 50 characters long' });
    }

    if (username.length < 3) {
      return res.status(400).json({ success: false, message: 'Username must be at least 3 characters long' });
    }

    if (username.length > 20) {
      return res.status(400).json({ success: false, message: 'Username must be at most 20 characters long' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    if (password.length > 100) {
      return res.status(400).json({ success: false, message: 'Password must be at most 100 characters long' });
    }


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

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    };

    const user = await User.findOne ({ email })
      .populate('lovedPosts', { name: 1, prompt: 1, photo: 1, love: 1 })
      .populate('createdPosts', { name: 1, prompt: 1, photo: 1, love: 1 });
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password);
    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: 'invalid email or password' });
    };
    const userForToken = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).send({ token, email: user.email, username: user.username, id: user._id, lovedPosts: user.lovedPosts, createdPosts: user.createdPosts, count: user.count });
  } catch (error) {
    logger.info('testing');
    res.status(500).json({ success: false, message: error.message });
  };
});

// const updateCount = async (id, count) => {
//   const response = await axios.put(`${baseUrl}/${id}`, count);
//   return response.data;
// }

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  if (typeof count !== 'number') {
    return res.status(400).json({ error: 'Invalid count value' });
  }

  if (count < 0) {
    return res.status(400).json({ error: 'Count cannot be negative' });
  }

  if (count > 5) {
    return res.status(400).json({ error: 'Count cannot be greater than 5' });
  }

  const user = await User.findByIdAndUpdate(id, { count }, { new: true });
  res.status(200).json({ success: true, data: user });
}
);
export default router;