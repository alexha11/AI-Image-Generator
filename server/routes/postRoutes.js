import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';
import User from '../mongodb/models/user.js';


dotenv.config();


const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({}).populate('user', { username: 1, email: 1 });

    res.status(200).json({ success: true, data: posts });
    
  } catch (error) {
    res.status(500).json({ success: false, data: error});
    console.error(error);
  }
})

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    
    const photoUrl = await cloudinary.uploader.upload(photo)
    
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
      love: 0,
      user: req.user.id,
    });
    console.log('post id' , newPost);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.createdPosts.push(newPost.id);
    await user.save();


    if (!newPost) {
      return res.status(400).json({ success: false, message: 'Post not created' });
    } 
    if (!photoUrl) {
      return res.status(400).json({ success: false, message: 'Photo not uploaded' });
    }
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }


    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, data: error});
  }
})

router.route('/:id').delete(async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: post });
  }
  catch (error) {
    res.status(500).json({ success: false, data: error});
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { name, prompt, photo, love } = req.body;  

    const updatedPost = {
      name: name,
      prompt: prompt,
      photo: photo,
      love: love,
    };

    const post = await Post.findByIdAndUpdate(req.params.id, updatedPost, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.lovedPosts.includes(req.params.id)) {
      user.lovedPosts.push(req.params.id);
      await user.save();
    }
    // } else {
    //   user.LovedPosts = user.LovedPosts.filter((post) => post !== req.params.id);
    //   await user.save();
    // }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ success: false, data: error.message });
  }
});


export default router;