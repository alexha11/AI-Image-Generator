import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import fetch from 'node-fetch'; 
import streamifier from 'streamifier'; 

import Post from '../mongodb/models/post.js';
import User from '../mongodb/models/user.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

function isBase64Image(photo) {
  const base64Regex = /^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+$/;
  return base64Regex.test(photo);
}

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({}).populate('user', { username: 1, email: 1 });

    res.status(200).json({ success: true, data: posts });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, data: error.message }); // Changed to error.message
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    if (!name || !prompt || !photo) {
      return res.status(400).json({ success: false, message: 'Name, prompt, and photo are required' });
    }

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    let photoUrl;

    // Function to resize image from URL
    async function resizeAndUploadImage(imageUrl) {
      const response = await fetch(imageUrl);
      const arrayBuffer = await response.arrayBuffer(); // Changed from response.buffer() to response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer);

      // Resize using sharp
      const resizedBuffer = await sharp(buffer)
        .resize(256, 256) // Resize to 256x256
        .toBuffer();

      // Upload the resized image buffer to Cloudinary
      const uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        // Create a readable stream from the buffer and pipe it into the upload stream
        streamifier.createReadStream(resizedBuffer).pipe(uploadStream);
      });

      return uploadedImage.secure_url;
    }

    if (isBase64Image(photo)) {
      // If the photo is in base64 format, upload directly to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(photo);
      photoUrl = uploadedImage.secure_url;
    } else {
      // Resize and upload the URL image
      photoUrl = await resizeAndUploadImage(photo);
    }

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl,
      love: 0,
      user: req.user.id,
    });

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

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, data: error.message }); // Changed to error.message
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: post });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, data: error.message }); // Changed to error.message
  }
});

// Rest of your code remains the same...

router.post('/:id/love', async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    if (!user || !post) {
      return res.status(404).json({ error: 'User or post not found' });
    }

    const isLoved = user.lovedPosts.includes(postId);
    
    if (isLoved) {
      user.lovedPosts.pull(postId);
      post.love -= 1;
    } else {
      user.lovedPosts.push(postId);
      post.love += 1;
    }
   
    await user.save();
    await post.save();
    
    res.status(200).json({
      post,
      isLovedByUser: !isLoved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in toggling love count' });
  }
});

export default router;
