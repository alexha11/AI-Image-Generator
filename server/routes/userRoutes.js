import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import * as dotenv from 'dotenv';
import User from '../mongodb/models/user.js';

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
    res.status(200).send({ token, email: user.email, username: user.username, id: user._id, lovedPosts: user.lovedPosts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// const updateCount = async (id, count) => {
//   const response = await axios.put(`${baseUrl}/${id}`, count);
//   return response.data;
// }

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;
  const user = await User.findByIdAndUpdate(id, { count }, { new: true });
  res.status(200).json({ success: true, data: user });
}
);
export default router;